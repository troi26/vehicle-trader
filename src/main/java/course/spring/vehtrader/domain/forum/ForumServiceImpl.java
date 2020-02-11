package course.spring.vehtrader.domain.forum;

import course.spring.vehtrader.exceptions.NonExistingEntityException;
import course.spring.vehtrader.model.forum.ForumPage;
import course.spring.vehtrader.model.forum.Post;
import course.spring.vehtrader.repo.forum.ForumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ForumServiceImpl implements ForumService {

    @Autowired
    ForumRepository forumRepository;

    @Override
    public List<ForumPage> findAll() {
        return forumRepository.findAll();
    }

    @Override
    public ForumPage findById(String id) {
        return forumRepository.findById(id).orElseThrow(() ->
                new NonExistingEntityException(String.format("ForumPage with id='%s' does not exist.", id)));
    }

    @Override
    public ForumPage findByTopic(String topic) {
        return forumRepository.findByTopic(topic).orElseThrow(() ->
                new NonExistingEntityException(String.format("ForumPage with topic='%s' does not exist.", topic)));
    }

    @Override
    public ForumPage create(ForumPage forumPage) {
        return forumRepository.insert(forumPage);
    }

    @Override
    public ForumPage update(ForumPage forumPage) {
        Optional<ForumPage> optPage = forumRepository.findByTopic(forumPage.getTopic());
        if (!optPage.isPresent()) {
            throw new NonExistingEntityException(String.format("ForumPage with topic='%s' does not exist.", forumPage.getTopic()));
        }
        return forumRepository.save(forumPage);
    }

    @Override
    public ForumPage delete(String id) {
        Optional<ForumPage> target = forumRepository.findById(id);

        if (!target.isPresent()) {
            throw new NonExistingEntityException(
                    String.format("ForumPage with ID=\"%s\" does not exist.", id));
        }
        forumRepository.deleteById(id);

        return target.get();
    }

    @Override
    public ForumPage insertPostIntoForumPage(String topic, Post post) {
        ForumPage page = findByTopic(topic);
        post.setMessageDateTime(LocalDateTime.now());
        page.getPosts().add(post);
        return forumRepository.save(page);
    }

    @Override
    public ForumPage deletePostFromForumPage(String topic, String postId) {
        Optional<ForumPage> target = forumRepository.findByTopic(topic);
        if(!target.isPresent()){
            throw new NonExistingEntityException(
                    String.format("ForumPage with topic=\"%s\" does not exist.", topic));
        }
        ForumPage result = target.get();
        result.getPosts().removeIf((post) -> post.getId().equals(postId));
        return forumRepository.save(result);
    }

    @Override
    public ForumPage updatePostFromForumPage(String topic, String postId, Post newPost) {
        Optional<ForumPage> target = forumRepository.findByTopic(topic);
        if(!target.isPresent()){
            throw new NonExistingEntityException(
                    String.format("ForumPage with topic=\"%s\" does not exist.", topic));
        }
        ForumPage result = target.get();
        int indexOfPost = result.getPosts().stream()
                .map(Post::getId).collect(Collectors.toList()).indexOf(postId);
//        newPost.setId(postId);
        result.getPosts().set(indexOfPost, newPost);
        return forumRepository.save(result);
    }

    @Override
    public Long getCount() {
        return forumRepository.count();
    }
}
