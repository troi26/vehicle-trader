package course.spring.vehtrader.model.chat;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @NonNull
    @NotNull
    String senderId;

    @NonNull
    @NotNull
    String receiverId;

    @NonNull
    @NotNull
    @Size(min = 1)
    String message;

    @NonNull
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime messageDateTime;
}
