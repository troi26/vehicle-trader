package course.spring.vehtrader.model;

import lombok.*;
import org.hibernate.validator.constraints.URL;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Document("offers")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class Offer {
    @Id
    private String id;
    @NonNull
    @NotNull
    private String userId;
    @NotNull
    @NonNull
    private double minCash;

    private LocalDateTime created_at = LocalDateTime.now();
    private LocalDateTime modified_at = LocalDateTime.now();
    @URL
    private String photoUrl;

    private String engineType;
    private int kmRun = -1;
    private LocalDateTime manufactured;
    private String brand;
    private String model;
    private String address;
    private boolean climatic = true;
    private boolean leatherSeats = false;
    private boolean electronicWindows = true;
    private boolean electronicMirrors = true;
    private int horsePower = -1;

}
