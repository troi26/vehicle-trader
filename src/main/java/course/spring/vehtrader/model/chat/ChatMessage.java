package course.spring.vehtrader.model.chat;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Document("chat_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    @Id
    String id;

    @NonNull
    @NotNull
    @Size(min = 1)
    String channelId;

    @NonNull
    @NotNull
    @Size(min = 1)
    String senderId;

    @NonNull
    @NotNull
    @Size(min = 1)
    String senderUsername;

    @NonNull
    @NotNull
    @Size(min = 1)
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
