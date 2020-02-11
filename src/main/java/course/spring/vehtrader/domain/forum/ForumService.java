package course.spring.vehtrader.domain.forum;

import course.spring.vehtrader.model.User;
import course.spring.vehtrader.model.forum.ForumPage;
import course.spring.vehtrader.model.forum.Post;

import java.util.List;
import java.util.Optional;

public interface ForumService {
    List<ForumPage> findAll();
    ForumPage findById(String id);
    ForumPage findByTopic(String id);
    ForumPage create(ForumPage forumPage);
    ForumPage update(ForumPage forumPage);
    ForumPage delete(String id);
    ForumPage insertPostIntoForumPage(String topic, Post post);
    ForumPage deletePostFromForumPage(String topic, String postId);
    ForumPage updatePostFromForumPage(String topic, String postId, Post newPost);
    Long getCount();

}
