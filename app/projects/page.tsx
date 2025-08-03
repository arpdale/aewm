import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60

async function getProjects() {
  const supabase = await createClient()
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_images (
        url,
        caption,
        order_index
      )
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  
  return projects
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Projects</h1>
        <p className="text-gray-600">
          Browse our complete collection of architectural engineering projects
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No projects yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group"
            >
              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] relative bg-gray-100">
                  {project.featured_image ? (
                    <Image
                      src={project.featured_image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : project.project_images?.[0] ? (
                    <Image
                      src={project.project_images[0].url}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">
                    {project.location_city && project.location_country && 
                      `${project.location_city}, ${project.location_country}`
                    }
                  </p>
                  {project.excerpt && (
                    <p className="text-gray-600 line-clamp-3">{project.excerpt}</p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    {project.architect && (
                      <span className="text-gray-500">
                        Architect: {project.architect}
                      </span>
                    )}
                    {project.completion_year && (
                      <span className="text-gray-500">
                        {project.completion_year}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}