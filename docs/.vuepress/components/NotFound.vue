<script setup>
import NotfoundIcon from '../icons/NotFound.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const items = ref([
    '生活或许充满挑战，但请相信，每一次跌倒都是为了更好地站起，每一次泪水都是成长的洗礼。',
    '特别生气的时候也不要跟亲人、爱人说那些恶毒的话，说过的话是收不回的。',
    '生活就像坐过山车，有高峰，也有低谷，这意味着，无论眼下是好是坏，都只是暂时的。',
    '自由不是想干什么就干什么，而是不想干什么，就有能力不干什么。',
    '无论正在经历什么，都请不要轻言放弃，因为从来没有一种坚持会被辜负。',
    '与其嫉妒别人，不如用实际行动超越别人。',
    '去见你想见的人，去做你想做的事，趁阳光正好，趁微风不燥，趁繁华还未开至荼靡，趁我们都还年轻。',
    '在人生的舞台上，我们都是自己故事的主角。有时欢笑如歌，有时泪水涟涟，但正是这些情感的交织，构成了丰富多彩的人生画卷。',
    '每天多一点点的努力，不为别的，只为了日后能够多一些选择，选择云卷云舒的小日子，选择自己喜欢的人。',
    '若美好迟迟未发生也不要着急，最好的总会在不经意间出现，你的幸福只是姗姗来迟。而你只需努力，剩下的交给时光。'
]);

const randomItem = ref("");
const router = useRouter()

function selectRandomItem() {
    const randomIndex = Math.floor(Math.random() * items.value.length);
    randomItem.value = items.value[randomIndex];
}

function goBack(){
    router.go(-1);
}


onMounted(() => {
    selectRandomItem();
});
</script>

<template>
    <div class="contain">
        <div class="text-contain">
            <NotfoundIcon class="icon" />
            <div class="text">还没写呢，快去催催吧！</div>
            <div class="tip">{{ randomItem }}</div>
            <div class="back">
                <el-link type="primary" @click="goBack">返回上一页</el-link>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.contain {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {}

    .text-contain {

        width: 80%;

        .text {
            font-size: 24px;
            margin-bottom: 20px;
        }

        .tip {
            position: relative;
            margin-left: 20px;

            &::before {
                content: '';
                position: absolute;
                left: -20px;
                top: 0;
                width: 3px;
                height: 100%;
                background-color: rgb(157, 157, 157);
            }
        }

        .back {
            margin-top: 40px;
        }
    }
}

.el-link.el-link--primary {
    --el-link-text-color: var(--vp-c-accent);
    --el-link-hover-text-color: var(--vp-c-accent-hover);
}
</style>