package course.spring.vehtrader.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Document("ratings")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class Rating {
    @Id
    private String id;

    @NotNull
    @NonNull
    private String graderUserId;

    @NotNull
    @NonNull
    private String evaluatedUserId;

    @NotNull
    @NonNull
    @Size(min = 1)
    private String comment;

    @NotNull
    @NonNull
    @Max(5)
    @Min(1)
    private Integer numStars;

    @Override
    public boolean equals(Object other) {
        if (this == other) {
            return true;
        }
        if (other == null || getClass() != other.getClass()) {
            return false;
        }
        Rating otherRating = (Rating) other;
        return graderUserId.equals(otherRating.graderUserId) &&
                evaluatedUserId.equals(otherRating.evaluatedUserId);
    }
}
