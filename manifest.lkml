project_name: "nordstrom_analytics_portal"

application: nordstrom_analytics_portal {
  label: "Nordstrom Analytics Portal"
  url: "https://localhost:8080/bundle.js"
  file: "bundle.js"
  
  entitlements: {
    local_storage: yes
    navigation: yes
    new_window: yes
    new_window_external_urls: ["https://docs.nordstrom.com"]
    use_form_submit: yes
    use_embeds: no
    use_downloads: no
    core_api_methods: [
      "me",
      "all_dashboards",
      "dashboard",
      "all_looks",
      "look",
      "run_look",
      "all_lookml_models",
      "lookml_model_explore"
    ]
    external_api_urls: []
    oauth2_urls: []
  }
}
