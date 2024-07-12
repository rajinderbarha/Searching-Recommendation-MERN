import React from 'react';

export default function Info() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">About Our E-commerce Website</h1>
      
      <section className="mb-5">
        <h2>Welcome</h2>
        <p>
          Welcome to our e-commerce website dedicated to offering the best selection of shoes. Our platform aims to provide a seamless and efficient shopping experience for all shoe enthusiasts. Explore a wide variety of shoes, from trendy sneakers to elegant dress shoes, and find the perfect pair for any occasion.
        </p>
      </section>
      
      <section className="mb-5">
        <h2>Our Mission</h2>
        <p>
          The creation of this e-commerce platform is driven by a passion for integrating advanced technologies into the shopping experience. Leveraging expertise in JavaScript, React, Node.js, Next.js, MongoDB, and Express, our goal is to build a robust and user-friendly online store.
        </p>
      </section>
      
      <section className="mb-5">
        <h2>Innovative Features</h2>
        <ul>
          <li>
            <strong>Advanced Semantic Search:</strong> Utilizing natural language processing (NLP) and technologies like TensorFlow.js and Fuse.js, our advanced semantic search functionality allows users to find products using synonyms and related terms, making the search process more intuitive and effective.
          </li>
          <li>
            <strong>Recommendation System:</strong> Our integrated recommendation system suggests relevant products based on the user's current selection, helping users discover new and exciting products that match their preferences.
          </li>
        </ul>
      </section>
      
      <section className="mb-5">
        <h2>How Our Search System Works</h2>
        <p>Our advanced search system leverages NLP to understand and process your queries more effectively:</p>
        <ul>
          <li>Enter your search term in the search bar located at the top of the page.</li>
          <li>The search system uses a large list of synonyms to match your query with relevant products. For example, searching for "sneakers" will also return results for "running shoes" or "trainers".</li>
          <li>The results are filtered and ranked to show the most relevant products first, helping you find what you're looking for quickly and easily.</li>
        </ul>
      </section>
      
      <section className="mb-5">
        <h2>How Our Recommendation System Works</h2>
        <p>Our recommendation system helps you discover new products based on your interests:</p>
        <ul>
          <li>When you view a product, the recommendation system analyzes the product's category and other features.</li>
          <li>It then suggests other products from the same category or with similar features, which you might find interesting.</li>
          <li>These recommendations are displayed on the product detail page, helping you explore more products that match your preferences.</li>
        </ul>
      </section>
      
      <section className="mb-5">
        <h2>Types of Recommendation Systems</h2>
        <p>Here are some common types of recommendation systems used in web development:</p>
        <ul>
          <li><strong>Content-Based Filtering:</strong> Recommends items similar to those the user has shown interest in, based on the attributes of the items.</li>
          <li><strong>Collaborative Filtering:</strong> Recommends items based on the preferences of other users who have similar tastes. It can be user-based or item-based.</li>
          <li><strong>Hybrid Recommendation System:</strong> Combines multiple recommendation strategies to provide more accurate suggestions.</li>
        </ul>
      </section>

      <section className="mb-5">
        <h2>How Natural and Fuse.js Work in Our Search System</h2>
        <p>We use Natural and Fuse.js to provide an advanced search functionality. Here's how these technologies work together:</p>
        <h3>Indexing with Natural</h3>
        <ul>
          <li>
            <strong>Tokenization:</strong> Natural's WordTokenizer is used to split product titles and descriptions into individual words (tokens).
          </li>
          <li>
            <strong>Synonym Replacement:</strong> Tokens are replaced with their synonyms using a predefined list. This helps in matching related terms.
          </li>
          <li>
            <strong>Stop Words Removal:</strong> Common stop words (e.g., "a", "the", "in") are removed to focus on significant words.
          </li>
          <li>
            <strong>Stemming:</strong> Tokens are reduced to their root form using Natural's PorterStemmer, which helps in matching different forms of a word.
          </li>
        </ul>
        <h3>Search and Scoring with Fuse.js</h3>
        <ul>
          <li>
            <strong>Initialization:</strong> Fuse.js is initialized with the preprocessed product data and configured with keys and weights for different fields (e.g., title, description).
          </li>
          <li>
            <strong>Threshold:</strong> A threshold value is set to control the fuzziness of the search. A lower threshold results in stricter matches.
          </li>
          <li>
            <strong>Distance:</strong> The distance parameter is used to specify how far apart two matches can be to be considered a match.
          </li>
          <li>
            <strong>Scoring:</strong> Fuse.js calculates a score for each match based on the configured keys and weights. Results are then sorted by relevance.
          </li>
        </ul>
      </section>
      
      <section className="mb-5">
        <h2>Natural Language Processing (NLP)</h2>
        <p>Natural Language Processing (NLP) is a field of artificial intelligence that focuses on the interaction between computers and humans through natural language. It involves the use of algorithms to understand, interpret, and generate human language.</p>
        <h3>Uses of NLP in Web Development</h3>
        <ul>
          <li><strong>Search Functionality:</strong> Enhances search capabilities by understanding user queries better and providing more relevant results.</li>
          <li><strong>Chatbots:</strong> Implements chatbots to provide customer support and engage with users in a more natural and interactive way.</li>
          <li><strong>Sentiment Analysis:</strong> Analyzes user reviews and feedback to gauge sentiments and improve products or services.</li>
          <li><strong>Personalization:</strong> Personalizes content and recommendations based on user preferences and behavior.</li>
        </ul>
        <h3>How We Use NLP</h3>
        <p>On our website, we use NLP to power the advanced semantic search functionality. By understanding synonyms and related terms, our search system can provide more accurate and relevant results, making it easier for you to find the products you need.</p>
      </section>
      
      <section className="mb-5">
        <h2>How to Use Our Website</h2>
        <ul>
          <li>Use the search bar at the top to find products quickly by entering relevant keywords.</li>
          <li>Browse through categories to explore our wide selection of shoes.</li>
          <li>Click on a product to view detailed information and see related product recommendations.</li>
          <li>Add products to your cart and proceed to checkout when you're ready to make a purchase.</li>
        </ul>
      </section>
      
      <section className="mb-5">
        <h2>Our Journey</h2>
        <p>
          Over the past few weeks, I have explored various libraries and technologies to bring this project to life. From learning about NLP and recommendation systems to integrating these advanced features into our MERN stack application, it has been a challenging yet rewarding journey.
        </p>
        <p>
          Our goal is to continuously improve the platform and provide an unparalleled shopping experience. We believe that technology can significantly enhance the way we shop online, and we are committed to incorporating the latest advancements to serve our customers better.
        </p>
      </section>
      
      <section className="mb-5">
        <h2>Contact Us</h2>
        <p>If you have any questions, feedback, or suggestions, please feel free to contact us. We value your input and are always here to assist you.</p>
        <p>Thank you for choosing our e-commerce platform. Happy shopping!</p>
      </section>
    </div>
  );
}
