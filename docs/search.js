/**
 * Enhanced search functionality for ycjdt.com
 * This script handles indexing and searching through blog content
 */

document.addEventListener('DOMContentLoaded', function() {
    // Search elements
    const searchBtn = document.querySelector('.search-button');
    const searchOverlay = document.getElementById('search-overlay');
    const searchCloseBtn = document.querySelector('.search-close-btn');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // Blog posts data structure with initial content
    let blogPosts = [
        {
            title: "You Can Just... Grift?",
            preview: "In progress...",
            date: "March 03, 2025",
            url: "grift.html",
            content: "The 'you can just do things' movement has been a breath of fresh air in a world increasingly paralyzed by bureaucracy and risk aversion. It's a call to action, a reminder that progress often comes from those willing to step outside established systems and just build. But as with any movement gaining momentum, there's a shadow side emerging—one where 'you can just do things' transforms into 'you can just... grift?'"
        },
        {
            title: "Why",
            preview: "The world deserves better context.",
            date: "March 02, 2025",
            url: "the-mission.html",
            content: "The 'you can just do things' ethos is a splendid mantra. It bubbled up in tech over the last couple of years, almost like a spontaneous rebellion against paralysis-by-analysis and red tape. In these respects, its epistemological backbone can be tied to (roughly) 3 things: e/acc, 'screw-the-suits' doers, and libertarianism. Naturally, these are all intrinsically linked."
        }
    ];

    // Function to fetch and extract content from blog posts
    async function fetchBlogContent() {
        try {
            console.log('Fetching blog content...');
            
            // Create an array of promises for all blog posts
            const fetchPromises = blogPosts.map(async (post) => {
                try {
                    const response = await fetch(post.url);
                    if (response.ok) {
                        const html = await response.text();
                        const extractedContent = extractContentFromHtml(html);
                        
                        if (extractedContent) {
                            post.fullContent = extractedContent;
                            console.log(`Indexed ${post.title}, content length: ${extractedContent.length}`);
                            
                            // Debug log to check content
                            console.log(`Sample content from ${post.title}: "${extractedContent.substring(0, 100)}..."`);
                        } else {
                            console.warn(`Failed to extract content from ${post.url}`);
                        }
                    } else {
                        console.warn(`Failed to fetch ${post.url}: ${response.status}`);
                    }
                } catch (error) {
                    console.error(`Error processing ${post.url}:`, error);
                }
            });
            
            // Wait for all fetch operations to complete
            await Promise.all(fetchPromises);
            
            console.log('Blog content indexing completed');
            
            // Log some debug info about the indexed content
            blogPosts.forEach(post => {
                if (post.fullContent) {
                    // Log a few test keywords to verify content is indexed
                    const testWords = ['economics', 'tech', 'libertarianism', 'democracy', 'progress'];
                    testWords.forEach(word => {
                        const found = post.fullContent.toLowerCase().includes(word.toLowerCase());
                        console.log(`${post.title} includes '${word}': ${found}`);
                    });
                } else {
                    console.warn(`No full content indexed for ${post.title}`);
                }
            });
        } catch (error) {
            console.error('Error in fetchBlogContent:', error);
        }
    }
    
    // Function to extract content from HTML
    function extractContentFromHtml(html) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Find the article content
            const articleContent = doc.querySelector('.blog-body');
            
            if (!articleContent) {
                console.warn('Could not find .blog-body element in the HTML');
                return null;
            }
            
            // Get all text content directly from the article body
            const fullText = articleContent.textContent || '';
            
            if (!fullText || fullText.trim() === '') {
                console.warn('Extracted empty text from .blog-body');
                return null;
            }
            
            // Also get specific elements for additional weighting
            const paragraphs = articleContent.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
            let content = fullText + ' '; // Start with the full text
            
            // Add specific elements with more weight
            paragraphs.forEach(element => {
                // Add heading content with more weight (by repeating it)
                if (element.tagName.startsWith('H')) {
                    // Add headings multiple times for higher weighting
                    const headingText = element.textContent.trim();
                    content += headingText + ' ' + headingText + ' ' + headingText + ' ';
                } else {
                    // Add paragraph text
                    const paragraphText = element.textContent.trim();
                    content += paragraphText + ' ';
                }
            });
            
            // Clean up the content (remove extra spaces, normalize whitespace)
            content = content.replace(/\s+/g, ' ').trim();
            
            return content;
        } catch (error) {
            console.error('Error in extractContentFromHtml:', error);
            return null;
        }
    }
    
    // Function to create a highlighted preview of the content
    function createHighlightedPreview(content, query, previewLength = 150) {
        if (!content || !query) return content;
        
        const lowerContent = content.toLowerCase();
        const lowerQuery = query.toLowerCase();
        
        if (lowerContent.includes(lowerQuery)) {
            const index = lowerContent.indexOf(lowerQuery);
            const halfPreviewLength = Math.floor(previewLength / 2);
            
            // Calculate start and end positions for the preview
            const start = Math.max(0, index - halfPreviewLength);
            const end = Math.min(content.length, index + lowerQuery.length + halfPreviewLength);
            
            // Create the preview text with ellipses if needed
            let previewText = '';
            if (start > 0) previewText += '...';
            previewText += content.substring(start, end);
            if (end < content.length) previewText += '...';
            
            return previewText;
        }
        
        // If query not found in content, return a default preview
        return content.substring(0, previewLength) + (content.length > previewLength ? '...' : '');
    }
    
    // Open search popup when search button is clicked
    searchBtn.addEventListener('click', function() {
        searchOverlay.classList.add('active');
        document.body.classList.add('no-scroll');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });
    
    // Close search popup when X is clicked
    searchCloseBtn.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
    
    // Close search popup when clicking outside the popup
    searchOverlay.addEventListener('click', function(e) {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });
    
    // Live search as user types
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query === '') {
            searchResults.innerHTML = '';
            return;
        }
        
        console.log('Searching for:', query);
        
        const filteredPosts = blogPosts.filter(post => {
            // Search in title, preview, and both short and full content
            const inTitle = post.title.toLowerCase().includes(query);
            const inPreview = post.preview.toLowerCase().includes(query);
            const inContent = post.content.toLowerCase().includes(query);
            const inFullContent = post.fullContent && post.fullContent.toLowerCase().includes(query);
            
            // Log for debugging
            if (inFullContent) {
                console.log(`Found "${query}" in full content of "${post.title}"`);
            }
            
            return inTitle || inPreview || inContent || inFullContent;
        });
        
        console.log('Found matches:', filteredPosts.length);
        
        if (filteredPosts.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
        } else {
            searchResults.innerHTML = '';
            
            filteredPosts.forEach(post => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                
                const link = document.createElement('a');
                link.className = 'search-result-link';
                link.href = post.url;
                
                const title = document.createElement('h3');
                title.className = 'search-result-title';
                title.textContent = post.title;
                
                const preview = document.createElement('p');
                preview.className = 'search-result-preview';
                
                // Determine which content to use for the preview
                let contentToSearch = post.fullContent || post.content;
                
                // Create a preview that highlights the search term
                let previewText = '';
                
                // Check if query is in the full content
                if (contentToSearch.toLowerCase().includes(query)) {
                    previewText = createHighlightedPreview(contentToSearch, query, 200);
                } 
                // Check if query is in the title
                else if (post.title.toLowerCase().includes(query)) {
                    previewText = post.preview || contentToSearch.substring(0, 150) + '...';
                }
                // Default to the preview text
                else {
                    previewText = post.preview;
                }
                
                preview.textContent = previewText;
                
                // Add a date element
                const date = document.createElement('span');
                date.className = 'search-result-date';
                date.textContent = post.date;
                
                link.appendChild(title);
                link.appendChild(preview);
                link.appendChild(date);
                resultItem.appendChild(link);
                searchResults.appendChild(resultItem);
            });
        }
    });
    
    // Initialize by fetching blog content
    fetchBlogContent();
}); 