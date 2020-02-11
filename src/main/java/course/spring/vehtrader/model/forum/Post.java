package course.spring.vehtrader.model.forum;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @Size(min=1)
    String id;

    @NonNull
    @NotNull
    @Size(min=1)
    String userId;

    @NonNull
    @NotNull
    @Size(min=1)
    String username;

    @NonNull
    @NotNull
    @Size(min=1)
    String message;

//    @NonNull
//    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime messageDateTime;
}
