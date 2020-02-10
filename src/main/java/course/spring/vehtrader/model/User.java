package course.spring.vehtrader.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.validator.constraints.URL;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;

@Document("users")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    private String id;
    @NotNull
    @NonNull
    private String username;
    @NonNull
    @NotNull
    @Size(min = 1)
    private String name;
    @NonNull
    @NotNull
    @Size(min = 1)
    private String surname;
    @NonNull
    @NotNull
    @Email
    @Size(min = 1)
    private String email;
    @NonNull
    @NotNull
    private double cashAmount;
    @NonNull
    @NotNull
    @Pattern(regexp = "((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$&%]).{5,16})",
    message = "Password must contain at least " +
            "one of lowercase, uppercase, digit, symbol(%,&,$,#) " +
            "and at least 6 characters long")
    @JsonProperty(access = WRITE_ONLY)
    private String password;
    @NonNull
    @NotNull
    private String roles = "ROLE_BIDDER";
    private boolean active = true;
    @URL
    private String avatarUrl;

    public User (String username, String name, String surname, String email, Double cashAmount
            , String password, String roles) {
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.cashAmount = cashAmount;
        this.password = password;
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(roles.split("\\s*,\\s*")).stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String toString() {
        return String.format(
                "{ \"id\": \"%s\", \"name\": \"%s\", \"surname\": \"%s\"," +
                        "\"username\": \"%s\", \"roles\": \"%s\" }",
                this.id,
                this.name,
                this.surname,
                this.username,
                this.roles);
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return active;
    }

    @Override
    public boolean isAccountNonLocked() {
        return active;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return active;
    }

    @Override
    public boolean isEnabled() {
        return active;
    }
}
