package course.spring.vehtrader.domain;

import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.exceptions.NonExistingEntityException;
import course.spring.vehtrader.model.Rating;
import course.spring.vehtrader.repo.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    RatingRepository ratingRepository;

    @Override
    public List<Rating> findAll() {
        return ratingRepository.findAll();
    }

    @Override
    public List<Rating> findByGraderUserId(String graderUserId) {
        return ratingRepository.findByGraderUserId(graderUserId);
    }

    @Override
    public List<Rating> findByEvaluatedUserId(String evaluatedUserId) {
        return ratingRepository.findByEvaluatedUserId(evaluatedUserId);
    }

    @Override
    public List<Rating> findByEvaluatedUserIdAndGraderUserId(String evaluatedUserId, String graderUserId) {
        return ratingRepository.findByEvaluatedUserIdAndGraderUserId(evaluatedUserId, graderUserId);
    }

    @Override
    public Rating findById(String id) {
        return ratingRepository.findById(id).orElseThrow(() -> new NonExistingEntityException(
                String.format("Rating with id='%s' does not exist.", id)));
    }

    @Override
    public Rating create(Rating rating) {
//        return findByEvaluatedUserId(rating.getEvaluatedUserId())
//                .stream()
//                .filter(findByGraderUserId(rating.getGraderUserId())::contains)
//                .collect(Collectors.toList())
//                .isEmpty()
//                ? ratingRepository.insert(rating) : null;
        return ratingRepository.findByEvaluatedUserIdAndGraderUserId(rating.getEvaluatedUserId(), rating.getGraderUserId()).isEmpty()
                ? ratingRepository.insert(rating) : null;
    }

    @Override
    public Rating update(Rating rating) {
        Optional<Rating> old = ratingRepository.findById(rating.getId());

        if (!old.isPresent()) {
            throw new NonExistingEntityException(
                    String.format("Rating with ID=\"%s\" does not exist.", rating.getId()));
        }

        return ratingRepository.save(rating);
    }

    @Override
    public Rating delete(String id) {
        Optional<Rating> target = ratingRepository.findById(id);

        if (!target.isPresent()) {
            throw new NonExistingEntityException(
                    String.format("Rating with ID=\"%s\" does not exist.", id));
        }
        ratingRepository.deleteById(id);

        return target.get();
    }

    @Override
    public Double getMeanGrade(String evaluatedUserId) {
        return findByEvaluatedUserId(evaluatedUserId).stream().mapToDouble(Rating::getNumStars).average().orElse(Double.NaN);
    }

    @Override
    public Long getCount() {
        return ratingRepository.count();
    }
}
