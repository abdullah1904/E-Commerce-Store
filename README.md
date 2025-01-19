<div align="center">
    <h1>E-Commerce Store</h1>
    <div>
        <img src="https://img.shields.io/badge/Next.js-%23000000?style=for-the-badge&logo=nextdotjs"/>
        <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
        <img src="https://img.shields.io/badge/ShadCn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white"/>
        <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"/>
        <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
        <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white">
        <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white">
    </div>
</div>
<p>This project is a fully functional e-commerce platform designed for selling and managing digital products. Built with Next.js 15 and modern technologies, it allows users to easily purchase digital products, while providing administrators with a simple way to manage the store.</p>

<h2>Key Features:</h2>
<ul>
    <li>
        <h3>User Functionality:</h3>
        <ul>   
            <li>Users can browse and purchase digital products seamlessly.</li>
            <li>Payments are processed securely using Stripe, and after completing a purchase, users receive a link to download the product via email.</li>
        </ul>
    </li>
    <li>
        <h3>Admin Functionality:</h3>
        <ul>   
            <li>Admins can add, update, and delete products with ease (deletion is only possible if there are no existing orders for the product).</li>
            <li>A detailed dashboard allows admins to monitor the store's statistics, including total orders and sales data.</li>
        </ul>
    </li>
    <li>
        <h3>Technology Highlights:</h3>
        <ul>   
            <li>
                <b>Next.js 15:</b> Utilized advanced features like Server Actions and Server-Side Rendering (SSR) for performance optimization, dynamic content rendering, and SEO improvement.
            </li>
            <li>
                <b>Tailwind CSS:</b> Designed with a responsive, modern UI, providing a seamless and user-friendly experience.
            </li>
            <li>
                <b>shadcn/ui:</b> Integrated for consistent, pre-built components that streamline the design process.
            </li>
            <li>
                <b>PostgreSQL & Prisma ORM:</b> Used for efficient database management with type safety and fast queries.
            </li>
            <li>
                <b>Stripe:</b> Integrated for secure and seamless payment processing.
            </li>
        </ul>
    </li>
</ul>

<h2>Environment Variables:</h2>
<p>To run the project locally, you’ll need to set up the following environment variables:</p>

```bash
DATABASE_URL=

ADMIN_USERNAME=
HASHED_ADMIN_PASSWORD=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=

RESEND_API_KEY=
SENDER_EMAIL=

NEXT_PUBLIC_SERVER_URL=
```

<p>This project not only showcases advanced Next.js features but also provides a complete, user-centric e-commerce solution for digital products. Feel free to explore, contribute, or use it as a reference for your own e-commerce platform development!</p>
