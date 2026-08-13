package com.kanakadurgamma.backend.controller;

import com.kanakadurgamma.backend.entity.TempleInfo;
import com.kanakadurgamma.backend.service.TempleInfoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/temple")
@CrossOrigin(origins = "http://localhost:5173")
public class TempleController {

    private final TempleInfoService templeInfoService;

    public TempleController(
            TempleInfoService templeInfoService) {

        this.templeInfoService = templeInfoService;
    }

    @GetMapping("/status")
    public String getStatus() {
        return "Kanaka Durgamma Temple API is running";
    }

    @GetMapping("/info")
    public List<TempleInfo> getTempleInfo() {
        return templeInfoService.getAllTempleInfo();
    }

    @GetMapping("/info/{id}")
    public TempleInfo getTempleInfoById(
            @PathVariable Long id) {

        return templeInfoService
                .getTempleInfoById(id)
                .orElse(null);
    }

    @PostMapping("/info")
    public TempleInfo createTempleInfo(
            @RequestBody TempleInfo templeInfo) {

        return templeInfoService
                .saveTempleInfo(templeInfo);
    }

    @PutMapping("/info/{id}")
    public TempleInfo updateTempleInfo(
            @PathVariable Long id,
            @RequestBody TempleInfo templeInfo) {

        templeInfo.setId(id);

        return templeInfoService
                .saveTempleInfo(templeInfo);
    }

    @DeleteMapping("/info/{id}")
    public String deleteTempleInfo(
            @PathVariable Long id) {

        templeInfoService.deleteTempleInfo(id);

        return "Temple information deleted successfully";
    }
}