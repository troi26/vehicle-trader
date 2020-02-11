package course.spring.vehtrader.web;

import course.spring.vehtrader.domain.RatingService;
import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.exceptions.NonExistingEntityException;
import course.spring.vehtrader.model.Rating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @GetMapping
    public List<Rating> getAllRatings() {
        return ratingService.findAll();
    }

    @GetMapping("/evaluatedUser/{userId}")
    public List<Rating> getRatingByEvaluatedUserId(@PathVariable("userId") String userId) {
        return ratingService.findByEvaluatedUserId(userId);
    }

    @GetMapping("/{evaluatedId}/{userId}")
    public List<Rating> getRatingByEvaluatedUserId(@PathVariable("evaluatedId") String evaluatedId,
                                                   @PathVariable("userId") String userId) {
        return ratingService.findByEvaluatedUserIdAndGraderUserId(evaluatedId, userId);
    }

    @GetMapping("/average/{userId}")
    public Double getMeanRatingByUserId(@PathVariable("userId") String userId) {
        return ratingService.getMeanGrade(userId);
    }

    @GetMapping("{id}")
    public Rating getRatingById(@PathVariable String id) {
        return ratingService.findById(id);
    }

    @PostMapping
    public Rating insertRating(@RequestBody Rating rating){
        return ratingService.create(rating);
    }

    @PutMapping("{id}")
    public Rating updateRating(@PathVariable String id, @Valid @RequestBody Rating rating){
        if(!id.equals(rating.getId())) {
            throw new InvalidEntityException(
                    String.format("Rating ID='%s' is different from URL resource ID='%s'", rating.getId(), id));
        }
        return ratingService.update(rating);
    }

    @PutMapping("/{evaluatedUserId}/{graderUserId}")
    public Rating updateRating(@PathVariable String evaluatedUserId, @PathVariable String graderUserId, @Valid @RequestBody Rating rating){
        List<Rating> oneElementListOfRatings = ratingService.findByEvaluatedUserIdAndGraderUserId(evaluatedUserId, graderUserId);
        if(!rating.getGraderUserId().equals(graderUserId) || !rating.getEvaluatedUserId().equals(evaluatedUserId)){
            throw new InvalidEntityException(
                    String.format("EvaluatorId = '%s' or GraderId = '%s' are not matching the resource's", rating.getId(), evaluatedUserId, graderUserId));
        }
        if(oneElementListOfRatings.isEmpty()){
            throw new NonExistingEntityException(
                    String.format("Evaluator ID='%s' and GraderId = '%s' are not found", rating.getId(), evaluatedUserId, graderUserId));
        }
        rating.setId(oneElementListOfRatings.get(0).getId());
        return ratingService.update(rating);
    }

    @DeleteMapping("{id}")
    public Rating deleteRating(@PathVariable String id){
        return ratingService.delete(id);
    }

}
