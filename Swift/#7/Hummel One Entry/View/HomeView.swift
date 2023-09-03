import SwiftUI

struct HomeView: View {
    
    @EnvironmentObject var pageViewModel: MenuViewModel
    
    var body: some View {
        
        NavigationView {
            
            Group {
                
                if let pages = pageViewModel.pages {
                    
                    ScrollView {
                        
                        VStack(spacing: 30) {
                            
                            RecentPageView(pages: pages)
                                .padding(.bottom)
                            
                            CategoriesView(pages: pages)
                            
                            ForEach(pages) { page in
                                
                                CategoryView(category: page, style: .detail)
                            }
                        }
                        .padding()
                    }
                }
            }
            .toolbar {
                
                ToolbarItem(placement: .topBarLeading) {
                    
                    Button(action: { SideMenuViewModel.shared.menuActive.toggle() }) {
                        
                        Image(systemName: "line.3.horizontal")
                    }
                }
            }
        }
    }
    
    @ViewBuilder
    private func RecentPageView(pages: [PageModel]) -> some View {
        
        let recent = pages.first(where: { $0.pageUrl == "featchured_objects" })
        
        if let recent = recent, let products = recent.viewModel.products {
            
            ScrollView(.horizontal) {
                
                HStack(spacing: 10) {
                    
                    ForEach(products) { product in
                        
                        ProductView(product: product, style: .responsive)
                            .frame(maxWidth: 150)
                    }
                }
            }
        }
    }
    
    @ViewBuilder
    private func CategoriesView(pages: [PageModel]) -> some View {
        
        Section {
            
            ScrollView(.horizontal, showsIndicators: false) {
                
                HStack(spacing: 10) {
                    
                    ForEach(pages) { page in
                        
                        CategoryView(category: page, style: .small)
                    }
                }
            }
            
        } header: {
            
            Text("Categories")
                .frame(maxWidth: .infinity, alignment: .leading)
        }
    }
}

#Preview {
    
    ContentView()
}
