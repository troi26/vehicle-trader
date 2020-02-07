package course.spring.vehtrader.domain;

import course.spring.vehtrader.model.Rating;

import java.util.List;

public interface RatingService {
    List<Rating> findAll();
    List<Rating> findByGraderUserId(String graderUserId);
    List<Rating> findByEvaluatedUserId(String evaluatedUserId);
    List<Rating> findByEvaluatedUserIdAndGraderUserId(String evaluatedUserId, String graderUserId);
    Rating findById(String id);
    Rating create(Rating rating);
    Rating update(Rating rating);
    Rating delete(String id);
    Double getMeanGrade(String evaluatedUserId);
    Long getCount();

}
