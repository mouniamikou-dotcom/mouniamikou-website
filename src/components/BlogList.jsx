"use client";
import { articleCategories } from '@/i18n/article-categories';

import { useState } from "react";
import Image from "next/image";
import Link from "@/components/LocalizedLink";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const BlogList = ({ initialPosts, headingLevel = "h2" }) => {
  const Heading = headingLevel;
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visiblePosts, setVisiblePosts] = useState(6);
  const blogs = initialPosts.filter(post => language !== "fr" || post.hasFrench).map(post => ({
    ...post,
    title: post.title?.[language] || post.title?.en || "",
    excerpt: post.excerpt?.[language] || post.excerpt?.en || "",
  }));
  const filteredBlogs = selectedCategory === "All" ? blogs : blogs.filter(post => post.category === selectedCategory);

  const categories = articleCategories;
  

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    setVisiblePosts(6);


  };

  const loadMore = () => {
    setVisiblePosts(prev => prev + 6);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      language === 'fr' ? 'fr-FR' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  return (
    <div className="container mx-auto py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <Heading className="text-5xl font-bold text-primary">
          {language === 'en' ? 'Legal Articles' : 'Articles Juridiques'}
        </Heading>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            
            onClick={() => handleFilterChange(category.id)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 
              ${selectedCategory === category.id 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            {category[language]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.slice(0, visiblePosts).map((blog) => (
          <div 
            key={blog._id} 
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {blog.mainImage && (
              <div className="relative h-48 w-full">
                <Image
                  src={blog.mainImage.asset.url}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6">
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-primary text-white mb-4">
                {categories.find(cat => cat.id === blog.category)?.[language] || blog.category}
              </span>

              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {blog.excerpt}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">
                    {formatDate(blog.publishedAt)}
                  </span>
                </div>

                <Link 
                  href={`/blogs/${blog.slug?.current}`}
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 
                    hover:bg-gray-50 transition-colors duration-200"
                >
                  {language === 'en' ? 'Read More' : 'Lire la Suite'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visiblePosts < filteredBlogs.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMore}
            className="px-8 py-3 text-lg border border-gray-300 rounded-lg
              hover:bg-gray-50 transition-colors duration-200"
          >
            {language === 'en' ? 'Load More Posts' : 'Charger Plus d\'Articles'}
          </button>
        </div>
      )}

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            {language === 'en' 
              ? 'No posts found in this category.' 
              : 'Aucun article trouvé dans cette catégorie.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
