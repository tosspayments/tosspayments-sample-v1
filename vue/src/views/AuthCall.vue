<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      const requestData = {
        orderId: route.query.orderId,
        amount: route.query.amount,
        paymentKey: route.query.paymentKey,
      };

      async function confirm() {
        try {
          const response = await fetch("/api/confirm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });

          const json = await response.json();

          if (!response.ok) {
            console.log(json);
            router.push(`/fail?message=${json.message}`);
          } else {
            console.log(json);
            router.push(`/success-view?paymentKey=${json.paymentKey}&orderId=${json.orderId}&amount=${json.totalAmount}`)
          }
        } catch (error) {
          console.error(error);
        }
      }

      confirm();
    });

    return {};
  },
};
</script>