import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60

async function getProject(slug: string) {
  const supabase = await createClient()
  
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_images (
        url,
        caption,
        alt_text,
        order_index
      ),
      profiles!projects_author_id_fkey (
        full_name,
        bio
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  
  if (error || !project) {
    return null
  }
  
  return project
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          {project.location_city && project.location_country && (
            <span>{project.location_city}, {project.location_country}</span>
          )}
          {project.completion_year && (
            <span>Completed: {project.completion_year}</span>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {(project.featured_image || project.project_images?.[0]) && (
        <div className="mb-12">
          <div className="aspect-[16/9] relative bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={project.featured_image || project.project_images[0].url}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Project Details */}
          <section className="prose prose-lg max-w-none mb-12">
            {project.content ? (
              <div dangerouslySetInnerHTML={{ __html: project.content }} />
            ) : project.excerpt ? (
              <p>{project.excerpt}</p>
            ) : null}
          </section>

          {/* AE Interests */}
          {project.ae_interests && project.ae_interests.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Architectural Engineering Interests</h2>
              <div className="flex flex-wrap gap-2">
                {project.ae_interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Image Gallery */}
          {project.project_images && project.project_images.length > 1 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Project Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.project_images
                  .sort((a: any, b: any) => a.order_index - b.order_index)
                  .map((image: any, index: number) => (
                    <div key={image.id || index} className="space-y-2">
                      <div className="aspect-[4/3] relative bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={image.url}
                          alt={image.alt_text || project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      {image.caption && (
                        <p className="text-sm text-gray-600">{image.caption}</p>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-6">Project Information</h2>
            
            <dl className="space-y-4">
              {project.architect && (
                <>
                  <dt className="text-sm font-medium text-gray-500">Architect</dt>
                  <dd className="text-gray-900">{project.architect}</dd>
                </>
              )}
              
              {project.structural_engineer && (
                <>
                  <dt className="text-sm font-medium text-gray-500">Structural Engineer</dt>
                  <dd className="text-gray-900">{project.structural_engineer}</dd>
                </>
              )}
              
              {(project.area_sqm || project.area_sqft) && (
                <>
                  <dt className="text-sm font-medium text-gray-500">Area</dt>
                  <dd className="text-gray-900">
                    {project.area_sqm && `${project.area_sqm.toLocaleString()} m²`}
                    {project.area_sqm && project.area_sqft && ' / '}
                    {project.area_sqft && `${project.area_sqft.toLocaleString()} ft²`}
                  </dd>
                </>
              )}
              
              {project.technical_details && Object.keys(project.technical_details).length > 0 && (
                <>
                  <dt className="text-sm font-medium text-gray-500">Technical Details</dt>
                  <dd className="text-gray-900">
                    <dl className="space-y-2">
                      {Object.entries(project.technical_details).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-xs text-gray-500 capitalize">
                            {key.replace(/_/g, ' ')}
                          </dt>
                          <dd className="text-sm">{String(value)}</dd>
                        </div>
                      ))}
                    </dl>
                  </dd>
                </>
              )}
            </dl>

            {/* Author Info */}
            {project.profiles && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Posted by</h3>
                <p className="text-gray-900">{project.profiles.full_name}</p>
                {project.profiles.bio && (
                  <p className="text-sm text-gray-600 mt-1">{project.profiles.bio}</p>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </article>
  )
}