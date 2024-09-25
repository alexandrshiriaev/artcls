import { notFound } from 'next/navigation';
import { getUserProfileDetails } from '@/actions/get-user-profile-details';
import UserAvatar from '@/components/user-avatar';

export default async function ProfilePage({
    params,
}: {
    params: { username: string };
}) {
    const username = params.username;
    if (!username || !username.startsWith('%40')) notFound();

    const userProfileDetails = await getUserProfileDetails(
        username.replace('%40', ''),
    );

    if (!userProfileDetails) return notFound();

    return (
        <main className="container flex justify-between">
            <h2>{userProfileDetails.name}</h2>
            <UserAvatar
                src={userProfileDetails.image}
                alt={userProfileDetails.name}
                width={80}
                height={80}
            />
        </main>
    );
}
