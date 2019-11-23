package course.spring.vehtrader.domain;

import course.spring.vehtrader.repo.BidsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BidsServiceImpl implements BidsService {
    @Autowired
    BidsRepository repository;
}
