package course.spring.vehtrader.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Document("bids")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class Bid {
    @Id
    private String id;
    @NonNull
    @NotNull
    private String offerId;
    @NonNull
    @NotNull
    private String userId;
    @NotNull
    @NonNull
    private double value;
    @NonNull
    @NotNull
    private LocalDateTime created_at = LocalDateTime.now();
    @NonNull
    @NotNull
    private LocalDateTime modified_at = LocalDateTime.now();
}


























