export interface Project {
  id: number;
  slug: string;
  title: string;
  category: "Full Stack" | "Frontend" | "Figma" | "Hackathon";
  image: string;
  link: string;
  github?: string;
  postman?: string; // Optional Link for Postman API Documentation
  description: string;
  longDescription?: string;
  technologies: string[];
  demoVideo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "finctrl",
    title: "FinCtrl",
    category: "Full Stack",
    image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1741248835/hudrwpm8ah1hnlfo0ahm.png",
    link: "https://fin-ctrl.vercel.app/",
    github: "https://github.com/shubhamiscodding/Fin_Ctrl",
    postman: "https://documenter.getpostman.com/view/39189595/2sBXwjwuGq",
    description: "A comprehensive financial management system to track expenses and manage budgets effectively.",
    longDescription: "FinCtrl is an intuitive and robust financial control hub. Built with a full-stack architecture, it empowers users to record daily transactions, establish monthly budget caps, gain visualized expense analytics, and maintain discipline with automated system notifications. By leveraging sleek UI elements combined with an optimized backend server, FinCtrl makes managing capital effortless and aesthetic.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    demoVideo: "https://youtu.be/xxlyAtqzp2E?si=BgXfwACeLx57Mt_8",
    featured: true
  },
  {
    id: 2,
    slug: "fast-typing",
    title: "Fast-Typing",
    category: "Full Stack",
    image: "https://placehold.co/650x550/E9F0E6/333?text=Fast+Typing",
    link: "https://gemini-type.vercel.app/",
    github: "https://github.com/ShubhamModi032006/Gemini-type",
    postman: "https://documenter.getpostman.com/view/39189595/2sBXwjwuGt",
    description: "Generates text with a fast-typing effect using the Gemini API.",
    longDescription: "Fast-Typing combines keyboard speed challenges with modern generative intelligence. The application harnesses the Gemini Pro model to dynamically generate custom passages depending on the chosen topic and difficulty level. A real-time engine registers WPM (Words Per Minute), accuracy percentages, and highlights syntax in real-time, providing gamers and students with an interactive, adaptive typing interface.",
    technologies: ["Gemini API", "Next.js", "Tailwind CSS"],
    demoVideo: "https://youtu.be/2ReHokzwV9A?si=ENugmCBEWsTWL8Oa"
  },
  {
    id: 3,
    slug: "file-uploader",
    title: "File Uploader",
    category: "Full Stack",
    image: "https://placehold.co/650x550/E9F0E6/333?text=Multer+Storage",
    link: "https://file-store-locally.vercel.app/login",
    github: "https://github.com/ShubhamModi032006/Multer-Storage",
    postman: "https://documenter.getpostman.com/view/39189595/2sBXwjwuGp",
    description: "Backend project for local file storage using Node.js and Multer.",
    longDescription: "A backend service built with Node.js and Express to manage high-throughput file uploads. Leveraging Multer configuration for file ingestion, size limiting, and type filtering, this project provides absolute controls for storing uploaded assets locally on servers. Features fully structured REST API routes to retrieve, manage, delete, and secure assets with clean token checks.",
    technologies: ["Node.js", "Multer", "Express"],
    demoVideo: "https://youtu.be/wOz6Vqsln40?si=smuhvp04x_zKwda_"
  },
  {
    id: 4,
    slug: "progcap-clone",
    title: "Progcap Clone",
    category: "Frontend",
    image: "https://cdn.prod.website-files.com/6193782af8f15b5c5763d1de/619b51335bf284cd78d1b5e1_Progcap_Logo.svg",
    link: "https://progcap-clone.onrender.com",
    github: "https://github.com/shubhamiscodding/progcap-clone",
    description: "A pixel-perfect clone of the Progcap platform showcasing responsive design.",
    longDescription: "A highly challenging corporate landing-page frontend recreation matching the dynamic layout of Progcap. Leveraged advanced modular React structures along with raw CSS configurations, creating fluid scroll animations, adaptive grids, floating headers, and comprehensive pixel-perfect responsive compliance for all viewport widths.",
    technologies: ["React", "CSS", "Responsive Layout"]
  },
  {
    id: 5,
    slug: "apollo-clone",
    title: "Apollo Clone",
    category: "Frontend",
    image: "https://images.apollo247.in/images/pharmacy_logo.svg?tr=q-70,w-100,dpr-2,c-at_max",
    link: "https://apolloclone.onrender.com",
    github: "https://github.com/shubhamiscodding/apolloclone",
    description: "A faithful recreation of the Apollo healthcare platform interface.",
    longDescription: "This project is a detailed recreation of the Apollo 24/7 web pharmacy portal. It focuses on pixel-perfect alignment, multi-level dropdown navigations, image slide carousels, categorized catalog views, and complex responsive grid structures built purely using native HTML structures and modular styling rules.",
    technologies: ["HTML", "CSS", "UI Mockup"]
  },
  {
    id: 6,
    slug: "youtube-clone",
    title: "Youtube Clone",
    category: "Frontend",
    image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-104-432560.png?f=webp&w=512",
    link: "https://youtube-frontend-ch16.onrender.com",
    github: "https://github.com/shubhamiscodding/spotify-with-react/tree/main/you-vite-react",
    description: "A feature-rich YouTube clone implementing core functionalities.",
    longDescription: "YouTube UI clone simulating core features of the global streaming platform. Consuming structural APIs to populate real-time channels, video search recommendations, and category tags. Integrates customized embedded player controls, responsive grid feeds, skeleton screen loading animations, and dynamic dark mode styling.",
    technologies: ["React", "YouTube API", "Vite", "CSS"]
  },
  {
    id: 7,
    slug: "finctrl-ui",
    title: "Finctrl UI",
    category: "Figma",
    image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1741248835/hudrwpm8ah1hnlfo0ahm.png",
    link: "https://www.figma.com/proto/DNBtQzukvRqvlJOR15WNiD/FINAL-PROJECT?node-id=165-316&t=IJSgkeDiJ1yPqsuJ-1",
    description: "A sleek Figma prototype for a financial management tool.",
    longDescription: "The original visual architecture and system design blueprint for the FinCtrl web interface. This extensive Figma workbook details full user journey structures, color token definitions, high-contrast dark theme variants, custom SVG vectors, and highly detailed interactive dynamic click-through prototype flows.",
    technologies: ["Figma", "UI Design", "Visual System"]
  },
  {
    id: 8,
    slug: "smellwell",
    title: "Smellwell",
    category: "Figma",
    image: "https://placehold.co/600x400/E9F0E6/333?text=SmellWell",
    link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?page-id=218%3A73&node-id=227-440&viewport=588%2C159%2C0.11&t=IH2rnykLPCUofh1R-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=227%3A440",
    description: "A fragrance brand landing page design featuring advanced prototyping.",
    longDescription: "SmellWell is a high-concept landing page prototype for a luxury organic fragrance company. The file displays layout structures focused on minimalist typography, dynamic product visual grids, interactive scent questionnaires, custom animations, and interactive checkout mockups.",
    technologies: ["Figma", "Interactive Mockup", "Design System"]
  },
  {
    id: 9,
    slug: "cricknews",
    title: "Cricknews",
    category: "Figma",
    image: "https://wallpapercave.com/wp/wp6916613.jpg",
    link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?node-id=90-400&t=uwCXGdlQ3AxLspQy-1",
    description: "A Figma prototype for a cricket news platform with interactive elements.",
    longDescription: "A specialized cricket sports portal design crafted entirely in Figma. Highlights real-time match scorecard containers, sports layout column design grids, article showcase animations, match filters, and fully interactive tabbed widgets simulating seamless client-side page transitions.",
    technologies: ["Figma", "Prototyping", "Sports UI"]
  },
  {
    id: 10,
    slug: "instagram",
    title: "Instagram",
    category: "Figma",
    image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1745691177/czc457xnddhzuvobj8xt.jpg",
    link: "https://www.figma.com/proto/9tFxecNpUhwc9yXIunCS2P/something-like-cloning?node-id=43-87&t=uwCXGdlQ3AxLspQy-1",
    description: "A Figma recreation of Instagram's interface with prototyping features.",
    longDescription: "A faithful recreation of Instagram's core mobile layout. Designed to master precise typography controls, uniform spacing models, asset ratios, post slide feeds, comment overlay drawer slides, and complex interactive prototype routing mapping profile visits, reels, and stories.",
    technologies: ["Figma", "Mockup Recreation"]
  },
  {
    id: 11,
    slug: "social-media",
    title: "Social Media",
    category: "Figma",
    image: "https://res.cloudinary.com/dqhn4dq02/image/upload/v1740113499/hinsjwtehr2aoxyj0f0s.png",
    link: "https://www.figma.com/proto/1rN6JDvA6MVeTwyABaoaHO/EXAM-BUT-UNIQE-IDEA?page-id=0%3A1&node-id=2-2&p=f&viewport=500%2C484%2C0.63&t=YXlQOTdePAZgLyKv-1&scaling=min-zoom&content-scaling=fixed",
    description: "A unique one-page social media design created in Figma.",
    longDescription: "An avant-garde visual concept that experiments with modern structural interfaces for community connection. Includes asymmetric grid arrays, glassmorphism card highlights, customized iconography schemes, and interactive layout mockups.",
    technologies: ["Figma", "Concept Art", "Advanced UI"]
  }
];
