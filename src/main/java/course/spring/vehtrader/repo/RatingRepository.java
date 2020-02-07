package course.spring.vehtrader.repo;

import course.spring.vehtrader.model.Offer;
import course.spring.vehtrader.model.Rating;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;
import java.util.List;

public interface RatingRepository extends MongoRepository<Rating, String> {
    List<Rating> findByEvaluatedUserId (String evaluatedUserId);
    List<Rating> findByGraderUserId(String graderUserId);
    List<Rating> findByEvaluatedUserIdAndGraderUserId(String evaluatedUserId, String graderUserId);
}
