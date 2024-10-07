<template>
    <div id="loading">
        <svg viewBox='0 0 50 50'>
            <circle r='25' cx='25' cy='25'></circle>
        </svg>
        <p>LOADING</p>
    </div>
</template>

<script>
import axios from 'axios'
import { getCurrentInstance } from 'vue';

export default {
    name: "loading",
    setup() {
        const { proxy } = getCurrentInstance(); // 获取当前组件实例的 proxy

        const conin = (next) => {
            let container = document.getElementById("loading");
            container.classList.remove("loading_out");
            setTimeout(() => {
                next();
                proxy.$parent.check_loading(); // 使用 proxy 来访问父组件方法
            }, 1000);
        };

        const conout = () => {
            let container = document.getElementById("loading");
            container.classList.add("loading_out");
        };

        axios.defaults.timeout = 10000
        axios.interceptors.response.use(
            response => {
                conout();
                return response;
            },
            error => {
                if(error.code == 'ECONNABORTED' || error.meggage.includes('timeout')){
                    console.log("Request timeout keeping loading animation")
                } else {
                    conout();
                }
                return Promise.reject(error)
            }
        )

        return {
            conin,
            conout,
        };
    }
}
</script>

<style scoped>
#loading {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #f7f7f7;
    z-index: 100000000;
    transition: 1s ease;
}

#loading svg {
    width: 5rem;
    margin-bottom: 2rem;
    overflow: visible;
    transition: 0.3s ease;
}

#loading svg circle {
    fill: none;
    stroke: #171717;
    stroke-width: 12;
    stroke-dasharray: 160;
    stroke-dashoffset: 160;
    transform-origin: center;
    animation: circle_rotate 3s ease-in infinite;
}

@keyframes circle_rotate {
    0% {
        transform: rotate(0deg);
        stroke-dashoffset: 160;
    }
    100% {
        transform: rotate(360deg);
        stroke-dashoffset: -160;
    }
}

.loading_out {
    transform: translateY(100%);
}

.loading_out svg,
.loading_out p {
    opacity: 0;
}
</style>
