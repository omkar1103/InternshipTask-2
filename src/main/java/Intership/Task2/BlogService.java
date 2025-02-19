package Intership.Task2;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public Blog addBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    public Optional<Blog> updateBlog(Long id, Blog updatedBlog) {
        return blogRepository.findById(id).map(existingBlog -> {
            existingBlog.setTitle(updatedBlog.getTitle());
            existingBlog.setContent(updatedBlog.getContent());
            existingBlog.setAuthor(updatedBlog.getAuthor());
            return blogRepository.save(existingBlog);
        });
    }

    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }
}