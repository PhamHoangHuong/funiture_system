<?php

namespace Modules\Checkout\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Contracts\Support\Renderable;

class CheckoutController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */

    //  test ghtk
    public function index()
    {
        $data = [
            "pick_province" => "Hà Nội",
            "pick_district" => "Quận Hai Bà Trưng",
            "province" => "Hà nội",
            "district" => "Quận Cầu Giấy",
            "address" => "P.503 tòa nhà Auu Việt, số 1 Lê Đức Thọ",
            "weight" => 100000,
            "value" => 3000000,
            "transport" => "road",
            "deliver_option" => "xteam",
            "tags" => [1, 7]
        ];
        $client = new Client();
        $response = $client->request('POST', 'https://services.giaohangtietkiem.vn/services/shipment/fee', [
            'headers' => [
                'Content-Type' => 'application/json',
                'Token' => '6aaee92fde315963b5791162440e4bb35fdc8c99'
            ],
            'json' => $data
        ]);
        // dd($response);
        $body = $response->getBody();
        // dd($body);      
        $data = json_decode($body, true);
        dd($data);
    }
    public function vnpay()
    {
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://127.0.0.1:8000/";
        $vnp_TmnCode = "G08VYFJ7";
        $vnp_HashSecret = "S23CIO1FLSGYQKN1T59KFT194KHAZI5H"; // Chuỗi bí mật
        $vnp_TxnRef = 1233; // Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này 
        $vnp_OrderInfo = 'Thanh toan hoa don';
        $vnp_OrderType = 'bill payment';
        $vnp_Amount = 500000 * 100;
        $vnp_Locale = 'vn';
        $vnp_BankCode = 'NCB';
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];

        // Add Params of 2.0.1 Version
        // $vnp_ExpireDate = $_POST['txtexpire'];
        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
            // "vnp_ExpireDate" => $vnp_ExpireDate,
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }

        $returnData = array(
            'code' => '00',
            'message' => 'success',
            'data' => $vnp_Url
        );

        if ($returnData['message'] == 'success') {
            $payment_status = 1;
            $transation_id = '';
        }

        $redirectUrl = $vnp_Url;
        // if ($request->payment_method == 'Vnpay') {
        //     $redirectUrl = $vnp_Url;
        // } else {
        //     echo json_encode($returnData);
        // }

        // Các đoạn mã phía sau
        // ...

        // Chuyển hướng nếu cần thiết
        if ($redirectUrl) {
            echo "<script>
                    alert('Bạn sẽ được chuyển hướng đến trang thanh toán.')
                window.location.href='$redirectUrl';</script>";
            exit();
        }
        // end vnnpay
    }
    public function momo()
    {
        $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";


        $partnerCode = 'MOMOBKUN20180529';
        $accessKey = 'klm05TvNBzhg7h7j';
        $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
        $orderInfo = "Cho minh xin tien an jolibee";
        $amount = "5000000";
        $orderId = time() . "";
        $redirectUrl = "http://127.0.0.1:8000";
        $ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
        $extraData = "";


        // if (!empty($_POST)) {
        // $partnerCode = $_POST["partnerCode"];
        // $accessKey = $_POST["accessKey"];
        // $serectkey = $_POST["secretKey"];
        // $orderId = $_POST["orderId"]; // Mã đơn hàng
        // $orderInfo = $_POST["orderInfo"];
        // $amount = $_POST["amount"];
        // $ipnUrl = $_POST["ipnUrl"];
        // $redirectUrl = $_POST["redirectUrl"];
        // $extraData = $_POST["extraData"];

        $requestId = time() . "";
        $requestType = "captureWallet";
        // $extraData = ($_POST["extraData"] ? $_POST["extraData"] : "");
        //before sign HMAC SHA256 signature
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
        $signature = hash_hmac("sha256", $rawHash, $secretKey);

        $data = array(
            'partnerCode' => $partnerCode,
            'partnerName' => "Test",
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature,
        );

        $client = new Client();
        $response = $client->request('POST', $endpoint, [
            'headers' => [
                'Content-Type' => 'application/json',
                // 'Token' => env('GHTK_TOKEN')
            ],
            'json' => $data
        ]);
        $body = $response->getBody();
        // dd($body);      
        $data = json_decode($body, true);
        dd($data);

        // $result = execPostRequest($endpoint, json_encode($data));
        // $jsonResult = json_decode($result, true);  // decode json

        //Just a example, please check more in there

        // header('Location: ' . $jsonResult['payUrl']);
    }
    public function checkout()
    {
        
    }

}
