import {Blog} from "../blogs/types/blog";
import {Post} from "../posts/types/post";


export const db = {
    blogs: <Blog[]>[
        {
            id: "1",
            name: "TechCorp",
            description: "A leading technology company specializing in AI solutions.",
            websiteUrl: "https://techcorp.com"
        },
        {
            id: "2",
            name: "GreenEnergy Ltd",
            description: "Innovative renewable energy provider for sustainable futures.",
            websiteUrl: "https://greenenergy.com"
        },
        {
            id: "3",
            name: "FoodieHub",
            description: "Your go-to platform for discovering local restaurants and recipes.",
            websiteUrl: "https://foodiehub.net"
        }
    ],
    posts: <Post[]>[
        {
            id: "1",
            title: "Introduction to AI",
            shortDescription: "A brief overview of artificial intelligence and its applications.",
            content: "Artificial intelligence (AI) is a field of computer science that aims to create machines capable of intelligent behavior. It encompasses various subfields like machine learning, natural language processing, and robotics. AI has applications in healthcare, finance, transportation, and more.",
            blogId: "1",
            blogName: "TechCorp"
        },
        {
            id: "2",
            title: "Sustainable Energy Solutions",
            shortDescription: "Exploring renewable energy options for a greener future.",
            content: "Renewable energy sources such as solar, wind, and hydroelectric power are essential for reducing carbon emissions. This post discusses the benefits, challenges, and latest advancements in sustainable energy technologies.",
            blogId: "1",
            blogName: "TechCorp"
        },
        {
            id: "3",
            title: "Delicious Vegan Recipes",
            shortDescription: "Easy-to-make vegan dishes for everyday meals.",
            content: "Vegan cooking focuses on plant-based ingredients. Here are some simple recipes including salads, stir-fries, and desserts that are both nutritious and tasty. Perfect for beginners looking to adopt a vegan lifestyle.",
            blogId: "2",
            blogName: "GreenEnergy Ltd"
        },
        {
            id: "4",
            title: "The Art of Baking Bread",
            shortDescription: "Step-by-step guide to homemade bread baking.",
            content: "Baking bread at home can be rewarding. This guide covers ingredients, techniques, and tips for achieving the perfect loaf. From sourdough to whole wheat, explore different varieties and enjoy the process.",
            blogId: "2",
            blogName: "GreenEnergy Ltd"
        },
        {
            id: "5",
            title: "Mental Health Awareness",
            shortDescription: "Understanding and supporting mental well-being.",
            content: "Mental health is crucial for overall wellness. This post discusses common issues, coping strategies, and resources for seeking help. Promoting open conversations can make a significant difference in communities.",
            blogId: "3",
            blogName: "FoodieHub"
        }
    ]
}