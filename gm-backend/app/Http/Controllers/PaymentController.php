<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function checkout(Request $request)
    {
        return $request
            ->user()
            ->checkout(
                'price_1RQ26aQ40JV4espjnC1tJrCY',
                [
                    'success_url' => config('app.frontend_url') . '?success=true',
                    'cancel_url' => config('app.frontend_url') . '?success=false',
                ]
            )->asStripeCheckoutSession();
    }
}
