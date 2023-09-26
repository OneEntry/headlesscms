import SwiftUI

struct SettingsView: View {
    
    @EnvironmentObject var appViewModel: AppViewModel
    
    var body: some View {
        
        NavigationView {
            
            Form {
                
                Section("System settings") {
                    
                    Picker("Content language", selection: $appViewModel.contentLanguage) {
                        
                        ForEach(AppViewModel.ContentLanguage.allCases, id: \.self) { language in
                            
                            Text(language.description)
                        }
                    }
                    .pickerStyle(.menu)
                }
            }
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                
                ToolbarItem(placement: .topBarLeading) {
                    
                    Button(action: { SideMenuViewModel.shared.menuActive.toggle() }) {
                        
                        Image(systemName: "line.3.horizontal")
                    }
                }
            }
        }
    }
}

#Preview {
    SettingsView()
}
