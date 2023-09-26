import SwiftUI

struct SideMenu: View {
    
    @EnvironmentObject var sideMenuViewModel: SideMenuViewModel
    
    var body: some View {
        
        VStack(alignment: .leading, spacing: 30) {
            
            LogoView()
            
            ForEach(SideMenuViewModel.MenuItem.allCases, id: \.self) { item in
                
                ItemView(item)
            }
            
            Spacer()
        }
        .padding(30)
    }
    
    @ViewBuilder
    private func LogoView() -> some View {
        
        Image("logo.large")
            .resizable()
            .aspectRatio(contentMode: .fit)
            .frame(maxWidth: .infinity, maxHeight: 40, alignment: .leading)
    }
    
    @ViewBuilder
    private func ItemView(_ item: SideMenuViewModel.MenuItem) -> some View {
        
        let condition = sideMenuViewModel.currentScreen == item
        
        HStack(spacing: 20) {
            
            Image(item.icon)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(maxWidth: 20)
            
            Text(item.rawValue)
        }
        .foregroundStyle(condition ? Color.accent : Color.black)
        .onTapGesture {
            
            sideMenuViewModel.currentScreen = item
        }
    }
}

#Preview {
    SideMenu()
        .environmentObject(SideMenuViewModel.shared)
}
