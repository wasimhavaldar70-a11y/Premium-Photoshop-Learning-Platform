export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  videoUrl: string; // Simulated video asset
  resources: { name: string; size: string; downloadUrl: string }[];
  notes: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessonsCount: number;
  lessons: Lesson[];
}

export interface Tip {
  id: string;
  title: string;
  category: string;
  readTime: string;
  likes: number;
  content: string;
  steps: string[];
}

export interface Short {
  id: string;
  title: string;
  videoUrl: string;
  views: string;
  likes: number;
  bookmarks: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  videoUrl?: string;
}

export const mockModules: Module[] = [
  {
    id: 'm1',
    title: 'Module 1 — Photoshop Basics',
    description: 'Master the user interface, keyboard shortcuts, canvas setup, and layers system.',
    lessonsCount: 12,
    lessons: [
      {
        id: 'l1',
        moduleId: 'm1',
        title: '01. Workspace Overview & Optimization',
        duration: '12:45',
        description: 'Learn how to customize and optimize the Photoshop interface for maximum design speed and performance. We will set up custom scratch disks, memory allocations, and color profiles.',
        difficulty: 'Beginner',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-stylus-over-a-graphics-tablet-34282-large.mp4',
        resources: [
          { name: 'Photoshop_Workspace_Cheat_Sheet.pdf', size: '1.2 MB', downloadUrl: '#' },
          { name: 'Custom_Workspace_Shortcuts.kys', size: '42 KB', downloadUrl: '#' }
        ],
        notes: 'Always allocate at least 70% of available RAM to Photoshop for smooth brushing. Configure your primary scratch disk on a high-speed SSD rather than a standard HDD. In this video, we will walk through the exact Preferences panel setup.'
      },
      {
        id: 'l2',
        moduleId: 'm1',
        title: '02. The Non-Destructive Layers Workflow',
        duration: '18:20',
        description: 'Deep dive into Layer Masks, Adjustment Layers, and Smart Objects. Learn why destroying pixels is the biggest amateur mistake.',
        difficulty: 'Beginner',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-a-digital-tablet-in-office-42289-large.mp4',
        resources: [
          { name: 'Layer_Masking_Exercise_Assets.zip', size: '18.4 MB', downloadUrl: '#' }
        ],
        notes: 'Rule #1 of Professional Design: Never use the Eraser tool. Always use Layer Masks instead. Layer masks allow you to hide pixels dynamically, giving you infinite freedom to make adjustments later.'
      },
      {
        id: 'l3',
        moduleId: 'm1',
        title: '03. Master Vector Shapes & Pathing',
        duration: '15:10',
        description: 'Learn how to use the Pen Tool, shape modes, and vector paths to create clean icons, logos, and custom UI components directly in Photoshop.',
        difficulty: 'Beginner',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-designer-working-on-a-laptop-42352-large.mp4',
        resources: [
          { name: 'Pen_Tool_Practice_Paths.psd', size: '5.6 MB', downloadUrl: '#' }
        ],
        notes: 'Hold ALT/Option while clicking an anchor point to convert a smooth point into a corner point. This is the key to drawing curves and sharp angles in the same path.'
      }
    ]
  },
  {
    id: 'm2',
    title: 'Module 2 — Selection Mastery',
    description: 'Learn advanced selection methods, from basic shapes to channel masking and hair refinement.',
    lessonsCount: 15,
    lessons: [
      {
        id: 'l4',
        moduleId: 'm2',
        title: '04. The Select and Mask Workspace',
        duration: '21:05',
        description: 'Isolate complex objects like animal fur, human hair, and transparent glasses. Use the Refine Edge brush to capture sub-pixel details.',
        difficulty: 'Intermediate',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-graphic-designer-working-on-drawing-tablet-31627-large.mp4',
        resources: [
          { name: 'Hair_Refinement_Sample_Image.jpg', size: '8.3 MB', downloadUrl: '#' }
        ],
        notes: 'When isolating hair, check the "Decontaminate Colors" box at the bottom of the Select & Mask interface to remove background color bleeding along the hair borders.'
      },
      {
        id: 'l5',
        moduleId: 'm2',
        title: '05. Channel Masking for High-Contrast Edges',
        duration: '19:40',
        description: 'Using RGB channels to create perfect selections of trees, fireworks, sky replacements, and other detailed edges.',
        difficulty: 'Advanced',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-moving-a-mouse-close-up-42323-large.mp4',
        resources: [
          { name: 'Tree_Silhouette_Channels.psd', size: '12.1 MB', downloadUrl: '#' }
        ],
        notes: 'Find the channel with the highest contrast between the subject and the background (usually the Blue channel for skies). Duplicate it, apply Levels (CTRL+L) to turn whites to 100% and blacks to 100%, and load it as a selection.'
      }
    ]
  },
  {
    id: 'm3',
    title: 'Module 3 — Retouching & Enhancing',
    description: 'Frequency Separation, Dodge & Burn, color grading, and skin texture restoration.',
    lessonsCount: 18,
    lessons: [
      {
        id: 'l6',
        moduleId: 'm3',
        title: '06. Commercial Skin Retouching via Frequency Separation',
        duration: '26:15',
        description: 'Divide an image into high-frequency (texture) and low-frequency (colors/tones) layers to smooth skin while keeping 100% of the natural pores.',
        difficulty: 'Advanced',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-drawing-on-a-graphics-tablet-32746-large.mp4',
        resources: [
          { name: 'Beauty_Portrait_RAW_16bit.tif', size: '45.2 MB', downloadUrl: '#' },
          { name: 'Frequency_Separation_Action.atn', size: '15 KB', downloadUrl: '#' }
        ],
        notes: 'For 8-bit images, use the Subtract setting with a scale of 2 and offset of 128 when applying Image on the High Frequency layer. For 16-bit, use Add with a scale of 2, offset of 0, and check the Invert box.'
      },
      {
        id: 'l7',
        moduleId: 'm3',
        title: '07. Non-Destructive Dodge & Burn Techniques',
        duration: '22:30',
        description: 'Sculpt facial features, enhance details, and blend light gradients using curves and solid color fill layers.',
        difficulty: 'Intermediate',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-designer-working-on-a-digital-tablet-in-office-42324-large.mp4',
        resources: [
          { name: 'Dodge_Burn_Practice_Face.jpg', size: '5.1 MB', downloadUrl: '#' }
        ],
        notes: 'Create a temporary Black & White adjustment layer to act as a "Visual Aid." Stripping the colors helps you focus entirely on the brightness tones (luminance) while dodging and burning.'
      }
    ]
  },
  {
    id: 'm4',
    title: 'Module 4 — Social Media Design',
    description: 'Learn high-converting YouTube thumbnails, Instagram carousels, and poster layouts.',
    lessonsCount: 20,
    lessons: [
      {
        id: 'l8',
        moduleId: 'm4',
        title: '08. High-Click YouTube Thumbnail Design',
        duration: '17:50',
        description: 'Understand color theory, layout hierarchies, text outlines, and focal glow elements that pull clicks.',
        difficulty: 'Intermediate',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-video-editing-timeline-macro-shot-40439-large.mp4',
        resources: [
          { name: 'YouTube_Thumbnail_Layout_Template.psd', size: '9.8 MB', downloadUrl: '#' },
          { name: 'Epic_3D_Text_Styles.asl', size: '1.2 MB', downloadUrl: '#' }
        ],
        notes: 'Keep the bottom-right corner clear of important visual content because the YouTube video timestamp badge covers this area.'
      }
    ]
  },
  {
    id: 'm5',
    title: 'Module 5 — Poster Design',
    description: 'Aesthetic layout spacing, typography hierarchies, texture overlays, and print bleed setups.',
    lessonsCount: 16,
    lessons: [
      {
        id: 'l9',
        moduleId: 'm5',
        title: '09. Cyberpunk Movie Poster Layout',
        duration: '24:40',
        description: 'Combine neon graphics, glitch effects, halftone patterns, and typography styling for a futuristic cinema poster.',
        difficulty: 'Intermediate',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-drawing-tablet-at-night-42325-large.mp4',
        resources: [
          { name: 'Cyberpunk_Assets_Pack.zip', size: '32.1 MB', downloadUrl: '#' }
        ],
        notes: 'Use a displacement map of your text combined with a scanline texture to achieve the digital hologram distortion effect.'
      }
    ]
  },
  {
    id: 'm6',
    title: 'Module 6 — Advanced Compositing',
    description: 'Create surreal landscapes, blend lighting gradients, match perspectives, and construct custom environments.',
    lessonsCount: 22,
    lessons: [
      {
        id: 'l10',
        moduleId: 'm6',
        title: '10. Atmospheric Light & Fog Effects',
        duration: '28:10',
        description: 'Blend multiple stock photos into a single fantasy scene. Learn perspective matching, atmosphere creation, and custom light source painting.',
        difficulty: 'Advanced',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-professional-videographer-in-creative-studio-41975-large.mp4',
        resources: [
          { name: 'Compositing_Raw_Assets.zip', size: '54.6 MB', downloadUrl: '#' },
          { name: 'Cloud_Fog_Brushes.abr', size: '4.8 MB', downloadUrl: '#' }
        ],
        notes: 'To blend the lighting of a placed subject into a background, apply a Match Color adjustment (Image > Adjustments > Match Color) and use the background image as the source layer.'
      }
    ]
  },
  {
    id: 'm7',
    title: 'Module 7 — Freelancing Projects',
    description: 'Client brief breakdown, sizing guides, export formats, and freelancing project workflow.',
    lessonsCount: 10,
    lessons: [
      {
        id: 'l11',
        moduleId: 'm7',
        title: '11. High-End Product Label Mockup',
        duration: '19:15',
        description: 'Wrap your label designs around 3D bottles and packaging dynamically using smart objects and the warp/displace filters.',
        difficulty: 'Intermediate',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-graphic-designer-sketches-a-character-42288-large.mp4',
        resources: [
          { name: 'Premium_3D_Bottle_Mockup.psd', size: '28.9 MB', downloadUrl: '#' }
        ],
        notes: 'Convert your packaging layers to a Smart Object before wrapping. This allows you to edit the design on a flat plane later, and Photoshop updates the 3D wrap instantly.'
      }
    ]
  },
  {
    id: 'm8',
    title: 'Module 8 — Portfolio Creation',
    description: 'Dribbble/Behance formatting, mockups selection, resume building, and branding yourself.',
    lessonsCount: 8,
    lessons: [
      {
        id: 'l12',
        moduleId: 'm8',
        title: '12. Formatting an Epic Behance Case Study',
        duration: '20:30',
        description: 'Organize your design drafts, grid structures, process breakdowns, and color systems into a visual story that recruits love.',
        difficulty: 'Beginner',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-designer-workspace-in-a-sunny-office-42350-large.mp4',
        resources: [
          { name: 'Behance_Case_Study_Grids.psd', size: '14.5 MB', downloadUrl: '#' }
        ],
        notes: 'Structure your Behance case study in this order: Main Impact Graphic, Client Brief, Moodboard & Inspiration, Grid Systems, Typography & Color Palette, Core Design mockups, and Process GIF.'
      }
    ]
  }
];

export const mockTips: Tip[] = [
  {
    id: 't1',
    title: 'Frequency Separation in 3 Steps',
    category: 'Skin Retouching',
    readTime: '3 min read',
    likes: 342,
    content: 'Frequency Separation allows you to edit the texture of skin separately from the colors and tones.',
    steps: [
      'Duplicate your image layer twice. Name the bottom copy "Low Frequency" and the top copy "High Frequency".',
      'Select "Low Frequency" layer, apply Filter > Blur > Gaussian Blur. Choose a radius (usually 4 to 8px) until the skin pores disappear but outlines remain.',
      'Select "High Frequency" layer, go to Image > Apply Image. Select the "Low Frequency" layer. For Blending select "Subtract", Scale 2, Offset 128. Change High Frequency layer blending mode to "Linear Light".'
    ]
  },
  {
    id: 't2',
    title: 'Perfect Color Matching hack',
    category: 'Compositing',
    readTime: '2 min read',
    likes: 512,
    content: 'Quickly match the lighting and color balance of an imported object with its background.',
    steps: [
      'Create a Curve adjustment layer on top of the imported object. Clip it (Alt/Option + click between layers) so it only affects the object.',
      'Hold Alt/Option and click "Auto" button inside the Curve options panel.',
      'Choose "Find Dark & Light Colors", then click the shadow color box and sample the darkest shadow from the background. Click the highlight box and sample the brightest highlight from the background. Click OK.'
    ]
  },
  {
    id: 't3',
    title: 'Remove Halo Rings Around Masks',
    category: 'Selection',
    readTime: '2 min read',
    likes: 198,
    content: 'Quickly clean up dark or light outlines on cutout objects.',
    steps: [
      'Double-click the layer mask to open Select & Mask settings.',
      'Shift the edge inwards by sliding the "Shift Edge" slider to the left (between -10% and -25%).',
      'Alternatively, select the brush tool, set blending mode to "Overlay", select white color and paint along light borders of the mask to refine the bleed.'
    ]
  }
];

export const mockShorts: Short[] = [
  {
    id: 's1',
    title: '3-Second AI Object Removal Hack!',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-removing-background-elements-in-photo-editor-41976-large.mp4',
    views: '124K',
    likes: 8420,
    bookmarks: 2450
  },
  {
    id: 's2',
    title: 'How to Wrap Text Around Anything',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-stylus-over-a-graphics-tablet-34282-large.mp4',
    views: '95K',
    likes: 6710,
    bookmarks: 1840
  },
  {
    id: 's3',
    title: 'Unbelievable 30-Second Retouching Magic',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-a-digital-tablet-in-office-42289-large.mp4',
    views: '210K',
    likes: 15400,
    bookmarks: 4890
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: 'test1',
    name: 'Marcus Vance',
    role: 'Lead UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'This course completely rebuilt my masking techniques. The section on channel masking alone saved me hundreds of hours of manual pen-tool work. The visual design is Apple-level.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-designer-workspace-in-a-sunny-office-42350-large.mp4'
  },
  {
    id: 'test2',
    name: 'Elena Rostova',
    role: 'Freelance Digital Artist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'I went from earning $50 per poster to landing $800 commercial label commissions. Frequency separation and commercial lighting workflows changed everything. Outstanding platform!'
  },
  {
    id: 'test3',
    name: 'Siddharth Roy',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    review: 'MasterClass vibes. The production quality, lesson notes, and resources are top-tier. Highly recommend the Lifetime access before the price increases.'
  }
];
