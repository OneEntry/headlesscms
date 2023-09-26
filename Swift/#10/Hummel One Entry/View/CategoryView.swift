import SwiftUI

struct CategoryView: View {
    
    let category: PageModel
    let style: Style
    
    @Environment(\.contentLanguage) var language
    
    enum Style {
        
        case small
        case detail
    }
    
    var body: some View {
        
        switch style {
            case .small: SmallCategoryView()
            case .detail: DetailCategoryView()
        }
    }
    
    @ViewBuilder
    private func SmallCategoryView() -> some View {
        
        VStack(alignment: .trailing) {
            
            Text(category.getContent(language)?.title ?? "")
            
            Text("\(category.viewModel.total ?? 0)")
        }
        .frame(maxWidth: 200)
        .padding()
        .background {
            
            RoundedRectangle(cornerRadius: 25)
                .stroke(.gray)
        }
    }
    
    @ViewBuilder
    private func DetailCategoryView() -> some View {
        
        if let products = category.viewModel.products {
            
            Section {
                
                ForEach(products) { product in
                    
                    NavigationLink(destination: ProductView(product: product, style: .detail)) {
                        
                        ProductView(product: product, style: .responsive)
                            .foregroundStyle(.black)
                    }
                }
            } header: {
                
                HStack {
                    
                    Text(category.getContent(language)?.title ?? "")
                    
                    Spacer()
                    
                    Button("More") {}
                }
            }
        }
    }
}

#Preview {
    ContentView()
}
