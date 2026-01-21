from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
def contact_form(request):
    """Handle contact form submissions and send emails via SMTP"""
    try:
        data = request.data

        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return Response(
                    {'error': f'Field {field} is required'},
                    status=400
                )

        # Prepare email
        subject_line = f"PrixRadio Contact: {data.get('subject')}"
        message = f"""
Neue Kontaktanfrage von {data.get('name')}

E-Mail: {data.get('email')}
Betreff: {data.get('subject')}

Nachricht:
{data.get('message')}
        """

        # Send email
        send_mail(
            subject_line,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.CONTACT_EMAIL],
            fail_silently=False,
        )

        # Also send confirmation email to user
        user_message = f"""
Vielen Dank für Ihre Kontaktanfrage!

Wir haben Ihre Nachricht erhalten und werden uns so bald wie möglich bei Ihnen melden.

Mit freundlichen Grüßen
Das PrixRadio Team
        """

        send_mail(
            'Bestätigung Ihrer Kontaktanfrage - PrixRadio',
            user_message,
            settings.DEFAULT_FROM_EMAIL,
            [data.get('email')],
            fail_silently=True,
        )

        return Response({'success': 'Email sent successfully'}, status=200)

    except Exception as e:
        logger.error(f'Error sending contact email: {str(e)}')
        return Response(
            {'error': 'Failed to send email'},
            status=500
        )


@api_view(['POST'])
@permission_classes([AllowAny])
def shop_request(request):
    """Handle shop request form submissions"""
    try:
        data = request.data

        shop_name = data.get('shopName')
        website = data.get('website')
        email = data.get('email')

        if not shop_name or not website or not email:
            return Response(
                {'error': 'All fields are required'},
                status=400
            )

        subject_line = f"Neue Händler-Anfrage: {shop_name}"
        message = f"""
Neue Händler-Anfrage auf Preisradio

Shop-Name: {shop_name}
Website: {website}
E-Mail: {email}

---
Gesendet von preisradio.de/haendler
        """

        send_mail(
            subject_line,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.CONTACT_EMAIL],
            fail_silently=False,
        )

        return Response({'success': 'Request sent successfully'}, status=200)

    except Exception as e:
        logger.error(f'Error sending shop request email: {str(e)}')
        return Response(
            {'error': 'Failed to send request'},
            status=500
        )
