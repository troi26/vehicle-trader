package course.spring.vehtrader.model;

import com.fasterxml.jackson.annotation.JsonEnumDefaultValue;
import course.spring.vehtrader.enums.Transmission;
import lombok.*;
import org.hibernate.validator.constraints.URL;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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
    private double startingPrice;
    @NotNull
    @NonNull
    @Size(min = 5)
    private String title;

    @NotNull
    @NonNull
    private boolean usedStatus;

    private LocalDateTime created_at = LocalDateTime.now();
    private LocalDateTime modified_at = LocalDateTime.now();
    @URL
    private String photoUrl;

    private String engineType;
    @JsonEnumDefaultValue
    private Transmission transmissionType = Transmission.MANUAL;
    @NotNull
    @NonNull
    private int kmRun;

    @NotNull
    @NonNull
    private LocalDateTime manufactured;
    @NotNull
    @NonNull
    @Size(min = 1)
    private String brand;
    @NotNull
    @NonNull
    @Size(min = 1)
    private String model;
    private String address;
    @NotNull
    @NonNull
    private boolean climatic = true;
    @NotNull
    @NonNull
    private boolean leatherSeats = false;
    @NotNull
    @NonNull
    private boolean electronicWindows = true;
    @NotNull
    @NonNull
    private boolean electronicMirrors = true;
    @NotNull
    @NonNull
    private int horsePower;

    @NotNull
    @NonNull
    private boolean activeStatus = true;

    private String winnerId;
}
