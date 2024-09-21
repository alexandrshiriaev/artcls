import { Button } from '@/components/shadcnui/button';
import { FaGithub, FaYandex } from 'react-icons/fa';
import { loginWithProvider } from '@/actions/login';

export default function SocialsButtons() {
    async function onClick(provider: 'yandex' | 'github') {
        await loginWithProvider(provider);
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => onClick('yandex')}
            >
                <FaYandex className="w-5 h-5" />
            </Button>
            <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => onClick('github')}
            >
                <FaGithub className="w-5 h-5" />
            </Button>
        </div>
    );
}
