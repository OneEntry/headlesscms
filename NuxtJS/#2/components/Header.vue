<template>
    <header id="header">
        <div class="container header-container">
            <div class="logo">
                <a href="/">
                    <img src="~/assets/images/logo.png">
                </a>
            </div>
            <div class="menu">
                <a href="#" class="menu-item">Shop</a>
                <a href="#" class="menu-item">Home</a>
                <a href="#" class="menu-item">Packages</a>
                <a href="#" class="menu-item">Blog</a>
            </div>
        </div>
    </header>
</template>

<script>

</script>


<style lang="scss">
#header {
    background-color: #4C4D56;
    padding: 10px;

    .logo {
        width: auto;
        margin-right: 30px;

        img {
            height: 74px;
        }
    }

    .menu {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding: 0 10px;

        .menu-item {
            height: 100%;
            font-family: "Lato";
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            line-height: 38px;
            color: #FFFFFF;
            text-align: center;
            display: flex;
            align-items: center;
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }

}


.header-container {
    display: flex;
}


</style>