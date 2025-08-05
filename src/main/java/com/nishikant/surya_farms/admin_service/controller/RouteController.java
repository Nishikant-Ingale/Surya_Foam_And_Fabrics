package com.nishikant.surya_farms.admin_service.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RouteController {
    @RequestMapping(value = {"/feedback", "/feedback/{path:[^\\.]*}", "/feedback/{path:^(?!static$).*}/{path2:[^\\.]*}"})
    public String forwardSpaRoutes(HttpServletRequest request) {
        String uri = request.getRequestURI();
        System.out.println("RouteController Intercepted URI: " + uri);
        if (uri.matches(".*\\.(js|css|map|ico|png|jpg|jpeg|svg|json|txt)$") || uri.startsWith("/static/") || uri.startsWith("/feedback/static/") || // This is crucial for assets within /feedback/
                uri.startsWith("/api/")) {             // Exclude API calls
            System.out.println("⛔ Skipping static asset or API path: " + uri);
            return null; // Let Spring's default static resource handler take over
        }
        if (uri.equals("/feedback") || uri.equals("/feedback/")) {
            System.out.println("✅ Forwarding base /feedback or /feedback/ to /feedback/index.html: " + uri);
            return "forward:/feedback/index.html";
        }
        if (uri.startsWith("/feedback/")) {
            System.out.println("✅ Forwarding SPA route under /feedback/ to /feedback/index.html: " + uri);
            return "forward:/feedback/index.html";
        }
        if (uri.equals("/")) {
            System.out.println("✅ Forwarding root '/' to /feedback/index.html: " + uri);
            return "forward:/feedback/index.html";
        }
        System.out.println("❓ Unhandled URI in RouteController: " + uri);
        return null;
    }

    @RequestMapping(value = {"/", "/ui", "/ui/{path:^(?!static|api$).*$}", "/ui/{path:^(?!static|api$).*$}/{path2:^(?!static|api$).*$}"})
    public String forwardReactRoutes(HttpServletRequest request) {
        String uri = request.getRequestURI();
        System.out.println("Intercepted URI: " + uri);

        // Allow static files and API paths to pass through
        if (uri.matches(".*\\.(js|css|map|ico|png|jpg|jpeg|svg|json|txt)$") ||
                uri.startsWith("/static/") ||
                uri.startsWith("/api/")) {
            return null; // Let Spring handle them
        }

        // Forward all React frontend paths to index.html
        return "forward:/index.html";
    }
}