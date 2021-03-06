package course.spring.vehtrader.domain;

import course.spring.vehtrader.model.User;

import java.util.List;

public interface UsersService {
    List<User> findAll();
    User findById(String id);
    User findByUsername(String username);
    User create(User user);
    User update(User user);
    User delete(String id);
    List<User> findInactiveAccounts();
    List<User> findActiveAccounts();
    List<User> findActiveAccountsNotMe(String userId);
    List<User> findAllByIdNot(String exclId);
    Long getCount();
}
