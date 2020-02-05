package course.spring.vehtrader.model.chat;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    String senderId;
    String receiverId;
    String message;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime messageDateTime;
}
