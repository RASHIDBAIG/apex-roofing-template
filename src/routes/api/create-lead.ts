import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/create-lead')({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const body = await request.json()
          
          const WHOP_API_KEY = 'YOUR_WHOP_API_KEY_HERE' 
          const ACCOUNT_ID = 'biz_t5XxR2r1ecIWcV'
          const PRODUCT_ID = 'prod_QkAF6zEQtwXyh'
          const USER_ID = 'user_tH19nCAzuftjy'

          const response = await fetch('https://api.whop.com/api/v1/leads', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${WHOP_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              account_id: ACCOUNT_ID,
              product_id: PRODUCT_ID,
              user_id: USER_ID,
              referrer: 'https://apex-roofing-template.whop.site/',
              metadata: {
                email: body.email,
                name: `${body.firstName} ${body.lastName}`,
                phone: body.phone,
                service_type: body.service,
                message: body.message,
                source: 'Apex Roofing Website',
              },
            }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            console.error('Whop API Error:', errorData)
            throw new Error('Failed to create lead')
          }

          return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' },
          })
        } catch (error) {
          return new Response(
            JSON.stringify({ success: false, error: 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          )
        }
      },
    },
  },
})