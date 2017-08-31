<template>
    <div style='width:180px;height:180px;background:#f7faff'>
        <x-circle :percent="percent2" :stroke-width="5" stroke-color="#e7f1ff">
            <div style='width:165px;height:165px;margin:0 auto'>
                <x-circle :percent="percent2" :stroke-width="5" stroke-color="#d0e3ff">
                    <div style='width:150px;height:150px;margin:auto;'>
                        <x-circle :percent="percent1" :stroke-width="5" stroke-color="#4a80ff" :trail-width="5" trail-color="#ffe894">
                            <span>
                                股票型占比
                                <br>
                                <span style="font-size:26px;color:#4a80ff">{{percent1}}%</span>
                            </span>
                        </x-circle>
                    </div>
                </x-circle>
            </div>
        </x-circle>
    </div>
</template>

<script>
    import { XCircle} from 'vux'
    export default {
    name: 'YCircle',
    props:["percent1","percent2"],
    components: {
        XCircle
    }
}
</script>
    // <YCircle :percent2="percent2" :percent1="percent1">
    // </YCircle>
            