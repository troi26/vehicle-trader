package course.spring.vehtrader.repo.forum;

import course.spring.vehtrader.model.forum.ForumPage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ForumRepository extends MongoRepository<ForumPage, String> {
}
