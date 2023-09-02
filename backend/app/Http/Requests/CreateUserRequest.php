<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $validator->errors()
        ]));
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required',
            'name.string' => 'The name field is of type string',
            'name.max' => 'The name field has a maximum size of 255',

            'email.required' => 'The email field is required',
            'email.email' => 'The email field is of type email',
            'email.unique' => 'The email field is invalid',

            'password.required' => 'The password field is required',
            'password.string' => 'The password field is of type string',
            'password.min' => 'The password field has a minimum length of 6 characters',
        ];
    }
}
