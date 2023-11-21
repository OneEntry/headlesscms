<template>
    <footer id="footer">
        <div class="blue-banner">
            <h3>Mercury, Venus, Earth, and Mars</h3>
            <p>Subscribe our Newsletter right now</p>
        </div>
        <div class="inner-container">
            <div class="inner-flex container">
                <div class="col">
                    <h4>Contact Info</h4>
                    <div class="address">
                        <h5>Address</h5>
                        <p>258C, South City, Main town</p>
                        <p>Brolex Tower, New York</p>
                    </div>
                    <div class="address phone">
                        <h5>Address</h5>
                        <p>+02154 785 654</p>
                        <p>+98745 852 147</p>
                    </div>
                    <div class="address phone">
                        <h5>Web</h5>
                        <p>info@example.com</p>
                        <p>www.example.com</p>
                    </div>
                </div>
                <div class="col">
                    <h4>Quick Link</h4>
                    <ul>
                        <li><img src="~/assets/images/arrow.png" alt="">About us</li>
                        <li><img src="~/assets/images/arrow.png" alt="">Our Experts</li>
                        <li><img src="~/assets/images/arrow.png" alt="">Support</li>
                        <li><img src="~/assets/images/arrow.png" alt="">Contact</li>
                    </ul>
                </div>
                <div class="col">
                    <h4>Information</h4>
                    <ul>
                        <li><img src="~/assets/images/arrow.png" alt="">About us</li>
                        <li><img src="~/assets/images/arrow.png" alt="">Our Experts</li>
                        <li><img src="~/assets/images/arrow.png" alt="">Support</li>
                        <li><img src="~/assets/images/arrow.png" alt="">Contact</li>
                    </ul>
                </div>
                <div class="col">
                    <h4>Opening Hour</h4>
                    <div class="opening">
                        <p><b>Monday to Friday</b></p>
                        <p>9.00 Am - 10.30 Pm</p>

                        <p><b>Saturday to Sunday</b></p>
                        <p>11.00 Am - 9.30 Pm</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <h5>Content <b>managment system</b> OneEntry</h5>
            <p>@ 2023 OneEntry, by <b>oneentry.cloud</b></p>
        </div>
    </footer>
</template>

<style lang="scss">
.blue-banner{
    width: 100%;
    padding: 53px 0 57px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(270deg, rgba(24, 168, 191, 0.8) 2.75%, rgba(30, 223, 254, 0.48) 38.2%, rgba(24, 168, 191, 0.8) 74.67%, rgba(127, 222, 229, 0.76) 98.99%);
    h3{
        font-weight: 700;
        font-size: 48px;
        line-height: 36px;
        color: #FFFAFA;
        margin: 0 0 37px 0;
    }
    p{
        font-weight: 700;
        font-size: 23px;
        line-height: 23px;
        margin: 0 0 69px 0;
        color: #FFFAFA;
    }
}

#footer{
    padding-top: 58px;
    .inner-container{
        padding-top: 74px;
        display: flex;
        justify-content: center;
        background: #F5F5F5;

        .inner-flex {
            display: flex;
            justify-content: space-between;
            margin-bottom: 145px;
        }
    }

    .col{
        h4{
            font-weight: 700;
            font-size: 24px;
            line-height: 24px;
            color: #EC722B;
            margin: 0 0 48px 0;
        }
        .address{
            margin-bottom: 35px;
            color: #86868A;
            h5{
                margin: 0;
                font-weight: 700;
                font-size: 23px;
                line-height: 26px;
            }
            p{
                margin: 0;
            }
            &.phone{
                text-decoration: underline;
            }
        }
        ul{
            list-style-type: none;
            padding: 0;
            li{
                font-weight: 700;
                font-size: 17px;
                line-height: 35px;
                color: #86868A;
                margin-top: 10px;

                img{
                    margin-right: 22px;
                    width: 14px;
                }

                &:hover {
                    cursor: pointer;
                    text-decoration: underline;
                }
            }
        }
        .opening p{
            font-weight: 200;
            font-size: 17px;
            line-height: 44px;
            color: #86868A;
            margin: 0;
            b{
                font-weight: 700 !important;

            }
        }
    }
    .bottom{
        background: #4C4D56;
        padding: 25px 0;
        h5{
            font-weight: 100;
            font-size: 16px;
            line-height: 16px;
            /* or 150% */
            margin: 0;
            text-align: center;

            /* White */

            color: #FFFFFF;
        }
        p{
            font-weight: 500;
            font-size: 11px;
            line-height: 15px;
            margin: 14px 0 0 0;
            text-align: center;

            /* White */

            color: #FFFFFF;
            b{
                color: #F76431
            }
        }
    }
}
</style>