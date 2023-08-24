<template>
    <div class="main-info">
        <div v-html="mainIfo.value"></div>
        <div class="column">
            <div class="image">
                <img :src="img.downloadLink" alt="main">
            </div>
            <div v-html="list.value"></div>
        </div>
        <p>
            Planets are among the most intriguing objects in the universe, and
            their formation and composition offer insight into the origins of
            our solar system and the potential for life elsewhere. Planets can
            consist of a variety of materials, including rock, metal, and gas,
            and can range in size from small asteroids to massive gas giants
        </p>
        <div class="blue-message">
            <p>
                As Carl Sagan famously remarked, "In the vastness of space and
                the immensity of time, it is my joy to share a planet and an
                epoch with Annie"
            </p>
        </div>
        <p>
            The planets in our solar system, for instance, are divided into
            two groups: the rocky, terrestrial planets (Mercury, Venus, Earth,
            and Mars) and the gas giants (Jupiter, Saturn, Uranus, and
            Neptune). The composition of these planets is determined by their
            distance from the sun and the conditions present during their
            formation. Understanding the formation and composition of planets
            is essential to unlocking the secrets of the universe and
            discovering the potential for life beyond Earth.
        </p>
        <p>
            The search for life beyond Earth is one of the most exciting and
            challenging endeavors in modern science. While Earth remains the
            only planet known to harbor life, scientists have discovered
            thousands of exoplanets, or planets outside our solar system, and
            many of them are considered potentially habitable. The Transiting
            Exoplanet Survey Satellite (TESS), for example, is designed to
            search for exoplanets around nearby stars and identify targets for
            further study. The search for life beyond Earth is ongoing and
            continues to drive scientific exploration and discovery. As we
            continue to explore the universe, we may one day discover that we
            are not alone in the cosmos.
        </p>
    </div>
</template>

<script setup>
import {useGetAttrByName} from "../composables/states";

const mainIfo = await useGetAttrByName('maininfo')
const list = await useGetAttrByName('list')
const img = await useGetAttrByName('img')
</script>

<style lang="scss">

.main-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2{
        font-weight: 700;
        font-size: 47px;
        line-height: 77px;
        color: #4C4D56;
        margin-bottom: 0;
    }
    h3{
        font-weight: 700;
        font-size: 28px;
        line-height: 34px;
        color: #FA6512;
        margin-top: 16px;
        margin-bottom: 0;
    }
    p{
        font-weight: 400;
        font-size: 16px;
        line-height: 30px;
        color: #9198A8;
    }
    .column{
        display: flex;
        gap: 166px;
        .img {
            width: 42%;
            img{
                width: 100%;
                margin-left: 42px;
            }
        }
        ul{
            padding: 0;
            list-style-type: none;
            font-weight: 400;
            font-size: 17px;
            line-height: 42px;
            color: #9198A8;
            margin-top: 75px;
            img{
                margin-right: 10px;
                width: 10px;
            }
            li{
                display: flex;
                align-items: center;
            }
        }
    }
    .blue-message{
        height: 270px;
        background: url('assets/images/blue-back.png');
        background-repeat: no-repeat;
        p{
            font-weight: 400;
            font-size: 32px;
            line-height: 40px;
            color: #525764;
            padding: 69px 64px 81px 85px;
        }
    }
}

</style>