package com.kanakadurgamma.backend.service;

import com.kanakadurgamma.backend.entity.TempleInfo;
import com.kanakadurgamma.backend.repository.TempleInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TempleInfoService {

    private final TempleInfoRepository templeInfoRepository;

    public TempleInfoService(
            TempleInfoRepository templeInfoRepository) {

        this.templeInfoRepository = templeInfoRepository;
    }

    public List<TempleInfo> getAllTempleInfo() {
        return templeInfoRepository.findAll();
    }

    public Optional<TempleInfo> getTempleInfoById(Long id) {
        return templeInfoRepository.findById(id);
    }

    public TempleInfo saveTempleInfo(TempleInfo templeInfo) {
        return templeInfoRepository.save(templeInfo);
    }

    public void deleteTempleInfo(Long id) {
        templeInfoRepository.deleteById(id);
    }
}