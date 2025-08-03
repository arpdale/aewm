import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { generateSlug } from '../lib/utils'

// Load environment variables from .env.local
config({ path: '.env.local' })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing required environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Sample projects data
const projects = [
  {
    title: "IKEA West Station Vienna",
    location_city: "Vienna",
    location_country: "Austria",
    address: "Europlatz 1, 1150, Vienna, Austria",
    completion_year: 2021,
    architect: "Querkraft Architekten",
    structural_engineer: "Thomas Lorenz ZT GmbH",
    area_sqm: 21600,
    area_sqft: 232500,
    excerpt: "A car-free IKEA store located near the Westbahnhof featuring a gridded facade and green design elements.",
    content: `IKEA West Station Vienna represents a new approach to urban retail design. This car-free IKEA store is strategically located near Vienna's Westbahnhof (West Station), making it easily accessible by public transportation.

The building features a distinctive gridded facade and incorporates numerous sustainable design elements, including a green roof that helps manage stormwater and provides insulation. The structural system is particularly notable as it's designed to work above an existing subway line, requiring careful engineering to minimize vibrations and ensure stability.

As a multi-use building, it combines retail space with other urban functions, demonstrating how large-format retail can be successfully integrated into dense urban environments without relying on automobile access.`,
    ae_interests: ["Sustainability", "Green Roof", "Structural system above subway", "Multi-use building design"],
    technical_details: {
      client: "IKEA",
      electrical_engineer: "TB Eipeldauer + Partner GmbH",
      construction_type: "Steel and concrete composite",
      sustainability_features: "Green roof, car-free design, urban integration"
    },
    status: "published",
    published_at: new Date("2023-11-19").toISOString()
  },
  {
    title: "Oasis Terraces",
    location_city: "Singapore",
    location_country: "Singapore",
    address: "681 Pungoll Dr Singapore, 820681",
    completion_year: 2017,
    architect: "Serie Architects",
    structural_engineer: "KTP Consultants Pte. Ltd.",
    area_sqm: 27400,
    area_sqft: 294931,
    excerpt: "Natural amphitheater design with urban farming and collective horticulture project featuring an open frame concept.",
    content: `Oasis Terraces is a groundbreaking mixed-use development that reimagines the traditional community center concept. The project features a natural amphitheater design that creates gathering spaces for the community while incorporating urban farming initiatives.

The building's open frame concept serves as an environmental filter between inside and outside spaces, allowing for natural ventilation while providing shade and protection from Singapore's tropical climate. The design was awarded in the World Architecture Festival's future projects category in 2015.

Standing at 5 stories tall, the development integrates retail, community facilities, and green spaces in a cohesive design that promotes social interaction and sustainable living practices.`,
    ae_interests: ["Natural amphitheater", "Urban farming and collective horticulture", "Open frame concept", "Environmental filter between inside and outside spaces"],
    technical_details: {
      associate_architect: "Multiply Architects LLP",
      mechanical_electrical_engineer: "Bescon Consulting Engineers Pte.",
      acoustical_engineer: "Alpha Acoustics Engineering",
      landscape_engineer: "Light Cibles Pte. Ltd.",
      owner_client: "Singapore Housing and Development Board",
      general_contractor: "Rich Construction Company Pte. Ltd.",
      height: "5 stories",
      awards: "World Architecture Festival future projects category (2015)"
    },
    status: "published",
    published_at: new Date("2023-11-18").toISOString()
  },
  {
    title: "GAIA – Nanyang Business School",
    location_city: "Singapore",
    location_country: "Singapore",
    address: "91 Nanyang Ave, Singapore 639956",
    completion_year: 2022,
    architect: "Toyo Ito",
    structural_engineer: "Aurecon",
    area_sqm: 43500,
    area_sqft: 468000,
    excerpt: "Asia's largest wooden building by volume featuring mass timber elements and net-zero energy certification.",
    content: `GAIA at Nanyang Business School represents a landmark achievement in sustainable architecture. As Asia's largest wooden building by volume of timber, it showcases the potential of mass timber construction in tropical climates.

The building utilizes CLT (Cross-Laminated Timber) and GluLam (Glue-Laminated) elements throughout its structure, achieving 'Green Mark Platinum' Net-zero energy certification. The energy-efficient envelope and passive displacement ventilation system work together to minimize energy consumption.

Spanning 6 stories and 220 meters in length, the building includes a 190-seat auditorium, lecture halls, laboratories, and open-air terraces with integrated green spaces. The design demonstrates how sustainable materials can create inspiring educational environments.`,
    ae_interests: ["Mass timber elements (CLT and GluLam)", "Green Mark Platinum Net-zero energy certified", "Energy efficient envelope", "Passive displacement ventilation", "Largest wooden building in Asia"],
    technical_details: {
      associate_architect: "RSP Architects, Planners, and Engineers",
      engineers: "Aurecon (Civil, Structural, Environmental Sustainability Design)",
      specialty_contractors: "Stora Enso – Prefabricated all Mass Timber Elements",
      client: "Nanyang Technical University",
      building_features: "190 seat auditorium, lecture halls, laboratories, open air terraces",
      dimensions: "6 stories, 220 meters long"
    },
    status: "published",
    published_at: new Date("2023-11-17").toISOString()
  },
  {
    title: "Gjuteriet",
    location_city: "Malmö",
    location_country: "Sweden",
    address: "Fyrskeppsgränd 8, 211 19 Malmö, Sweden",
    completion_year: 2023,
    architect: "Kjellander Sjöberg",
    structural_engineer: "BK Konsult",
    area_sqm: 6030,
    area_sqft: 64916,
    excerpt: "Sustainable renovation project featuring recycled mass timber and local materials with facade restoration.",
    content: `Gjuteriet represents a thoughtful approach to adaptive reuse and sustainable renovation. The project transforms an existing industrial building using recycled mass timber and locally sourced materials.

The renovation features both glue-laminated timber and cross-laminated timber elements, demonstrating how sustainable materials can breathe new life into existing structures. The careful facade restoration maintains the building's historical character while upgrading its performance.

The project showcases how renovation can be more sustainable than demolition and reconstruction, preserving embodied energy while creating modern, functional spaces.`,
    ae_interests: ["Recycled mass timber", "Sustainable renovation", "Local materials", "Glue-laminated timber", "Cross-laminated timber", "Facade restoration"],
    technical_details: {
      sustainability_advisor: "Matter by Brix",
      timber_frame: "Martinsons",
      landscape_architect: "Sted Landskap",
      renovation_type: "Industrial to mixed-use conversion"
    },
    status: "published",
    published_at: new Date("2023-11-16").toISOString()
  }
]

async function seedDatabase() {
  console.log('Starting database seed...')

  try {
    // First, create a default admin user if it doesn't exist
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@aeworldmap.com',
      password: 'temporaryPassword123!',
      email_confirm: true,
      user_metadata: {
        full_name: 'Admin User'
      }
    })

    if (authError && !authError.message.includes('already been registered')) {
      throw authError
    }

    const userId = authData?.user?.id || 'existing-user-id' // You'll need to get this from your auth.users table

    // Update the user's profile to admin
    if (authData?.user?.id) {
      await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', authData.user.id)
    }

    // Insert projects
    for (const project of projects) {
      const slug = generateSlug(project.title)
      
      // Insert the project
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert({
          title: project.title,
          slug,
          content: project.content,
          excerpt: project.excerpt,
          status: project.status,
          location_city: project.location_city,
          location_country: project.location_country,
          address: project.address,
          completion_year: project.completion_year,
          architect: project.architect,
          structural_engineer: project.structural_engineer,
          area_sqm: project.area_sqm,
          area_sqft: project.area_sqft,
          technical_details: project.technical_details,
          ae_interests: project.ae_interests,
          author_id: userId,
          published_at: project.published_at,
          view_count: Math.floor(Math.random() * 1000) // Random view count for demo
        })
        .select()
        .single()

      if (projectError) {
        console.error(`Error inserting project ${project.title}:`, projectError)
        continue
      }

      console.log(`✓ Inserted project: ${project.title}`)

      // Add some sample images for each project
      const sampleImages = [
        {
          url: `https://source.unsplash.com/800x600/?architecture,${project.location_city}`,
          caption: `Exterior view of ${project.title}`,
          alt_text: `${project.title} building exterior`,
          order_index: 0
        },
        {
          url: `https://source.unsplash.com/800x600/?building,modern`,
          caption: `Interior spaces`,
          alt_text: `${project.title} interior`,
          order_index: 1
        }
      ]

      for (const image of sampleImages) {
        await supabase
          .from('project_images')
          .insert({
            project_id: projectData.id,
            ...image
          })
      }

      // Set the first image as featured image
      await supabase
        .from('projects')
        .update({ featured_image: sampleImages[0].url })
        .eq('id', projectData.id)
    }

    // Add some sample tags
    const tags = [
      { name: 'Sustainable', slug: 'sustainable' },
      { name: 'Mass Timber', slug: 'mass-timber' },
      { name: 'Green Building', slug: 'green-building' },
      { name: 'Renovation', slug: 'renovation' },
      { name: 'Mixed Use', slug: 'mixed-use' },
      { name: 'Net Zero', slug: 'net-zero' }
    ]

    for (const tag of tags) {
      await supabase
        .from('tags')
        .insert(tag)
        .select()
    }

    console.log('✓ Database seeded successfully!')

  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

// Run the seed function
seedDatabase()