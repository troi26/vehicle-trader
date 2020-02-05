package course.spring.vehtrader.domain.forum;

import course.spring.vehtrader.model.User;
import course.spring.vehtrader.model.forum.ForumPage;

import java.util.List;

public interface ForumService {
    List<ForumPage> findAll();
    ForumPage findById(String id);
    ForumPage findByTopic(String topic);
    ForumPage create(ForumPage forumPage);
    ForumPage update(ForumPage forumPage);
    ForumPage delete(String id);
    Long getCount();
}
