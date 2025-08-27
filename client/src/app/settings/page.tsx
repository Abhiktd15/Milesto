import { Button } from '@/components/ui/button';
import { UserIcon } from 'lucide-react';

const Settings = () => {
    const userSettings = {
        username: "johndoe",
        email: "john@gmail.com",
        teamName: "Development Team",
        roleName: "Developer"
    }

    return (
        <div className="min-h-screen  p-8">
            {/* <Header name="Settings" /> */}
            <div className="flex justify-center mt-8">
                <div className="bg-white dark:bg-gray-900/50 rounded-lg shadow-lg border  p-8 w-full max-w-md">
                    <div className="flex flex-col items-center mb-8">
                        <UserIcon className="h-20 w-20 text-black dark:text-white mb-2" />
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{userSettings.username}</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-300">{userSettings.email}</span>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="py-4 flex justify-between items-center">
                            <span className="text-gray-500 dark:text-gray-300 font-semibold">Role</span>
                            <span className="text-gray-800 dark:text-white font-medium">{userSettings.roleName}</span>
                        </div>
                        <div className="py-4 flex justify-between items-center">
                            <span className="text-gray-500 dark:text-gray-300 font-semibold">Team</span>
                            <span className="text-gray-800 dark:text-white font-medium">{userSettings.teamName}</span>
                        </div>
                    </div>
                    <div className="flex justify-end mt-8">
                        <Button className="px-5 py-2 rounded-lg  text-white dark:text-black font-semibold shadow transition">Edit Profile</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
