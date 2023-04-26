<template>
    <div class="sm:flex sm:flex-row m-5 gap-5">
        <div class="basis-1/3">
            <img class="md:max-w-[400px] w-full rounded-3xl" :src="bookProps.srcImg" alt="">
            <audio controls class="md:max-w-[400px] w-full my-5">
                <source :src="bookProps.srcFile" type="audio/mpeg">
            </audio>
        </div>

        <div class="basis-2/3">
            <div class="text-center">
                <h1 class="text-5xl font-bold mt-3 mb-8">{{ bookProps.bookName }}</h1>
                <p class="text-xl">Một cuốn tiểu thuyết</p>
                <p>bởi {{ bookProps.author }}</p>
                <p class="font-bold text-4xl my-10">{{ bookProps.price }} VNĐ</p>
                <!-- <ButtonGreen value="Thêm vào giỏ hàng" /> -->
                <input @click="addBook" type="submit" value="Thêm vào giỏ hàng" class="bg-teal-400 text-white py-2 px-6 rounded-full mt-4 cursor-pointer hover:bg-teal-500">
            
            </div>
                       
            <!-- thời lượng, ngôn ngữ, người đọc -->
            <div class="text-center my-20">
                <div class="divide-x-2 border-y-2 py-4">
                    <div class="text-center">
                        <p>Chiều dài</p>
                        <p class="text-lg font-bold">{{ bookProps.duration }}</p>
                    </div>
                    <!-- <div class="basis-1/2">
                        <p>Ngôn ngữ</p>
                        <p class="text-lg font-bold">Tiếng Anh</p>
                    </div> -->
                </div>

                <!-- <div class="border-b-2 py-4">
                    <p>Người kể chuyện</p>
                    <p class="text-lg font-bold">Jennifer Kim &amp; Julian Cihi</p>
                </div> -->
            </div>

            <!-- tom tat sach va tac gia -->
            <!-- <div class="flex flex-row gap-10 my-20 text-lg font-bold border-b-2">
                <button @click="showBookSummary" :class="isBookInformation ? 'border-b-2 border-teal-500' : '' ">Tóm tắt</button>
                <button @click="showAuthorIntroduction" :class="!isBookInformation ? 'border-b-2 border-teal-500' : ''">Giới thiệu tác giả</button>
            </div> -->

            <!-- tom tat sach -->
            <!-- <div v-show="isBookInformation">
                <p>Trong cuốn tiểu thuyết thú vị này của tác giả bán chạy nhất The Storyed Life of AJ Fikry, hai người bạn—thường yêu nhau, 
                    nhưng không bao giờ là người yêu—đến với nhau như những đối tác sáng tạo trong thế giới thiết kế trò chơi điện tử, 
                    nơi thành công mang đến cho họ danh tiếng, niềm vui và bi kịch , trùng lặp, và cuối cùng là một loại bất tử.Vào một 
                    ngày lạnh buốt, vào tháng 12 năm cuối cấp tại Harvard, Sam Masur bước ra khỏi một toa tàu điện ngầm và nhìn thấy, giữa 
                    đám người đang chờ đợi trên sân ga, Sadie Green. Anh gọi tên cô. Trong một khoảnh khắc, cô ấy giả vờ như không nghe 
                    thấy anh ấy, nhưng sau đó, cô ấy quay lại và trò chơi bắt đầu: một sự hợp tác huyền thoại sẽ đưa họ trở thành ngôi sao. 
                    Họ vay tiền, cầu xin sự giúp đỡ và thậm chí trước khi tốt nghiệp đại học, họ đã tạo ra bộ phim bom tấn đầu tiên của mình, 
                    Ichigo: một trò chơi mà người chơi có thể thoát khỏi giới hạn của cơ thể và sự phản bội của trái tim, và trong đó cái 
                    chết không có ý nghĩa gì khác ngoài cơ hội khởi động lại và chơi lại. Đây là câu chuyện về những thế giới hoàn hảo mà 
                    Sam và Sadie xây dựng, thế giới không hoàn hảo mà họ đang sống và về mọi thứ đến sau thành công: Tiền bạc. Danh tiếng. 
                    trùng lặp. Bi kịch. Kéo dài ba mươi năm, từ Cambridge, Massachusetts, đến Venice Beach, California, và những vùng đất 
                    ở giữa và xa hơn nữa, Ngày mai, Ngày mai và Ngày mai của Gabrielle Zevinlà một cuốn tiểu thuyết rực rỡ và được tưởng 
                    tượng phức tạp, xem xét bản chất đa dạng của bản sắc, trò chơi như một loại hình nghệ thuật, công nghệ và trải nghiệm 
                    của con người, khuyết tật, thất bại, khả năng cứu chuộc trong trò chơi và trên hết là nhu cầu kết nối của chúng ta: được 
                    yêu và được yêu . Vâng, đó là một câu chuyện tình yêu, nhưng nó không phải là câu chuyện bạn đã đọc trước đây.
                    Ảnh bìa: The Great Wave (chi tiết) của Katsushika Hokusai. Bảo tàng Nghệ thuật Metropolitan, New York.</p>
            </div> -->

            <!-- gioi thieu tac gia -->
            <!-- <div v-show="isBookInformation == false">
                <p>
                    "GABRIELLE ZEVIN là tác giả của một số tiểu thuyết có sách bán chạy nhất trên thế giới của tờ New York Times và được giới 
                    phê bình đánh giá cao, trong đó có The Storied Life of AJ Fikry, đã giành được Giải thưởng Nhà sách Độc lập Nam California 
                    và Giải thưởng Nhà sách Nhật Bản cùng nhiều danh hiệu khác, và Young Jane Young, đã đoạt giải Sách Phương Nam. Tiểu thuyết 
                    của cô đã được dịch sang ba mươi chín ngôn ngữ. Cô ấy cũng đã viết sách cho độc giả trẻ, bao gồm cả Elsewhere từng đoạt 
                    giải thưởng. Cô ấy sống ở Los Angeles."
                </p>
            </div> -->

            <!-- tag -->
            <!-- <div class="flex flex-row gap-10 my-5">
                <a href="" class="text-blue-400 italic">Viễn tưởng</a>
                <a href="" class="text-blue-400 italic">Tiểu thuyết - văn học</a>
            </div> -->
        </div>
    </div>

</template>


<style scoped>
    
</style>


<script lang="ts">
import { defineComponent } from 'vue';

    export default defineComponent({
        props: ["bookProps"],
        data() {
            return {
                // isBookInformation: true,
            };
        },
        setup(props, context) {
            const addBook = () => {
                context.emit("add-book");
            }
            return{
                addBook
            }
        },
        methods: {
            // showBookSummary(){
            //     this.isBookInformation = true;
            // },
            // showAuthorIntroduction(){
            //     this.isBookInformation = false;
            // },
            
            
            },

    });

</script>